// Analytics tracking utility
// Usage: import { trackEvent } from '@/lib/analytics';

const ANALYTICS_API = '/api/analytics/track';

// Generate or get session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem('portfolio_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem('portfolio_session_id', sessionId);
  }
  return sessionId;
}

interface EventData {
  [key: string]: any;
}

interface TrackOptions {
  eventData?: EventData;
  language?: string;
}

// Track any event
export async function trackEvent(
  eventType: string, 
  options: TrackOptions = {}
): Promise<void> {
  try {
    const sessionId = getSessionId();
    
    await fetch(ANALYTICS_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType,
        sessionId,
        language: options.language,
        eventData: options.eventData || {}
      }),
      // Don't wait for response to avoid blocking
      keepalive: true
    });
  } catch (error) {
    // Silently fail - analytics should not break the app
    console.error('Analytics tracking failed:', error);
  }
}

// Specific tracking functions for each event type
export const trackFirstVisit = (language: string) => 
  trackEvent('first_visit', { language });

export const trackCvDownload = () => 
  trackEvent('cv_download');

export const trackCvPrint = () => 
  trackEvent('cv_print');

export const trackCertificateView = (certificateId: string) => 
  trackEvent('certificate_view', { 
    eventData: { certificateId } 
  });

export const trackCertificateDownload = (certificateId: string) => 
  trackEvent('certificate_download', { 
    eventData: { certificateId } 
  });

export const trackProjectView = (projectId: string, projectTitle: string) => 
  trackEvent('project_view', { 
    eventData: { projectId, projectTitle } 
  });

export const trackProjectGithub = (projectId: string, projectTitle: string) => 
  trackEvent('project_click_github', { 
    eventData: { projectId, projectTitle } 
  });

export const trackProjectDemo = (projectId: string, projectTitle: string) => 
  trackEvent('project_click_demo', { 
    eventData: { projectId, projectTitle } 
  });

export const trackContactSubmit = (formData: EventData) => 
  trackEvent('contact_submit', { 
    eventData: formData 
  });

export const trackGithubVisit = () => 
  trackEvent('github_visit');
