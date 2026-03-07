import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export const dynamic = 'force-dynamic';

// Use database credentials from .env
const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || 'localhost',
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || 'portfolio_analytics',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function GET() {
  let connection;
  
  try {
    connection = await pool.getConnection();
    
    // Test connection
    await connection.ping();
    
    // Get visitor statistics
    const [visitors]: any = await connection.query(`
      SELECT 
        COUNT(*) as totalVisitors,
        SUM(visit_count) as totalVisits,
        COUNT(DISTINCT language_selected) as languages,
        MAX(first_visit) as firstVisit,
        MAX(last_visit) as lastVisit
      FROM portfolio_visitors
    `);

    // Get recent events count by type
    const [events]: any = await connection.query(`
      SELECT 
        event_type,
        COUNT(*) as count
      FROM portfolio_events
      GROUP BY event_type
      ORDER BY count DESC
    `);

    // Get recent visitors
    const [recentVisitors]: any = await connection.query(`
      SELECT 
        session_id,
        language_selected,
        country,
        device_type,
        visit_count,
        first_visit,
        last_visit
      FROM portfolio_visitors
      ORDER BY last_visit DESC
      LIMIT 20
    `);

    // Get actions summary
    const [actions]: any = await connection.query(`
      SELECT 
        action_type,
        COUNT(*) as count
      FROM portfolio_actions
      GROUP BY action_type
      ORDER BY count DESC
    `);

    connection.release();

    return NextResponse.json({
      success: true,
      data: {
        visitors: visitors[0] || {
          totalVisitors: 0,
          totalVisits: 0,
          languages: 0,
          firstVisit: null,
          lastVisit: null
        },
        events: events || [],
        actions: actions || [],
        recentVisitors: recentVisitors || []
      }
    });
  } catch (error: any) {
    console.error('Database error:', error.message);
    
    if (connection) {
      try {
        connection.release();
      } catch (e) {
        // ignore
      }
    }
    
    // Return error with instructions
    return NextResponse.json({
      success: false,
      error: 'Database not connected',
      message: 'Please set up your MySQL database with these environment variables:\nDB_HOST, DB_USER, DB_PASSWORD, DB_NAME\n\nOr create the database and tables using analytics-mysql.sql',
      data: null
    });
  }
}
