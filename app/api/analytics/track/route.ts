import { NextRequest, NextResponse } from 'next/server';

// Configure your MySQL database connection
// You'll need to install mysql2: npm install mysql2
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || 'localhost',
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || 'portfolio_analytics',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Types of events
type EventType = 
  | 'first_visit' 
  | 'cv_download' 
  | 'cv_print' 
  | 'certificate_view' 
  | 'certificate_click'
  | 'project_view'
  | 'project_click_github'
  | 'project_click_demo'
  | 'contact_submit'
  | 'github_visit';

export async function POST(request: NextRequest) {
  let connection;
  try {
    const body = await request.json();
    const { 
      eventType, 
      eventData = {}, 
      sessionId,
      language 
    } = body;

    // Validate event type
    const validEvents: EventType[] = [
      'first_visit',
      'cv_download',
      'cv_print',
      'certificate_view',
      'certificate_click',
      'project_view',
      'project_click_github',
      'project_click_demo',
      'contact_submit',
      'github_visit'
    ];

    if (!eventType || !validEvents.includes(eventType)) {
      return NextResponse.json(
        { error: 'Invalid event type' },
        { status: 400 }
      );
    }

    // Get client info
    const userAgent = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || '';
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                    request.headers.get('x-real-ip') || 
                    'unknown';

    // Determine device type
    const deviceType = userAgent.includes('Mobile') ? 'mobile' : 
                      userAgent.includes('Tablet') ? 'tablet' : 'desktop';

    connection = await pool.getConnection();
    
    // Handle first_visit - create/update visitor
    if (eventType === 'first_visit' && sessionId && language) {
      await connection.query(
        `INSERT INTO portfolio_visitors (session_id, language_selected, device_type, last_visit)
         VALUES (?, ?, ?, NOW())
         ON DUPLICATE KEY UPDATE
           last_visit = NOW(),
           language_selected = COALESCE(?, language_selected),
           visit_count = visit_count + 1`,
        [sessionId, language, deviceType, language]
      );
    }

    // Get or create visitor ID for other events
    let visitorId = null;
    if (sessionId) {
      const [rows]: any = await connection.query(
        'SELECT id FROM portfolio_visitors WHERE session_id = ?',
        [sessionId]
      );
      if (rows.length > 0) {
        visitorId = rows[0].id;
        
        // Update last visit
        await connection.query(
          'UPDATE portfolio_visitors SET last_visit = NOW() WHERE id = ?',
          [visitorId]
        );
      }
    }

    // Insert event
    await connection.query(
      `INSERT INTO portfolio_events (event_type, event_data, user_ip, user_agent, referrer)
       VALUES (?, ?, ?, ?, ?)`,
      [eventType, JSON.stringify(eventData), clientIp, userAgent, referrer]
    );

    // Insert action if we have a visitor
    if (visitorId) {
      await connection.query(
        `INSERT INTO portfolio_actions (visitor_id, action_type, action_details)
         VALUES (?, ?, ?)`,
        [visitorId, eventType, JSON.stringify(eventData)]
      );
    }

    connection.release();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    if (connection) connection.release();
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve analytics data
export async function GET(request: NextRequest) {
  let connection;
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const days = parseInt(searchParams.get('days') || '7');

    connection = await pool.getConnection();
    let result: any;

    if (type === 'summary') {
      // Get summary statistics
      const [rows]: any = await connection.query(`
        SELECT 
          (SELECT COUNT(*) FROM portfolio_visitors) as total_visitors,
          (SELECT COUNT(*) FROM portfolio_events WHERE created_at > DATE_SUB(NOW(), INTERVAL 1 DAY)) as today_visits,
          (SELECT COUNT(*) FROM portfolio_events WHERE event_type = 'cv_download') as cv_downloads,
          (SELECT COUNT(*) FROM portfolio_events WHERE event_type = 'project_view') as project_views,
          (SELECT COUNT(*) FROM portfolio_events WHERE event_type = 'contact_submit') as contact_submits
      `);
      result = rows;
    } else if (type === 'events') {
      // Get recent events
      const [rows]: any = await connection.query(`
        SELECT event_type, event_data, created_at 
        FROM portfolio_events 
        ORDER BY created_at DESC 
        LIMIT 50
      `);
      result = rows;
    } else if (type === 'actions') {
      // Get action counts by type
      const [rows]: any = await connection.query(`
        SELECT action_type, COUNT(*) as count 
        FROM portfolio_actions 
        WHERE created_at > DATE_SUB(NOW(), INTERVAL ? DAY)
        GROUP BY action_type 
        ORDER BY count DESC
      `, [days]);
      result = rows;
    } else {
      // Get visitor stats
      const [rows]: any = await connection.query(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END) as today,
          SUM(visit_count) as total_visits
        FROM portfolio_visitors
      `);
      result = rows;
    }

    connection.release();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Analytics GET error:', error);
    if (connection) connection.release();
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
