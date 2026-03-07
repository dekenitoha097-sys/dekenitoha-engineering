-- =============================================
-- Analytics Database Schema for Portfolio (MySQL Version)
-- =============================================

-- Table for tracking all events
CREATE TABLE IF NOT EXISTS portfolio_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    event_data JSON DEFAULT '{}',
    user_ip VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_events_type (event_type),
    INDEX idx_events_created (created_at)
);

-- Table for unique visitors (tracked by session/IP)
CREATE TABLE IF NOT EXISTS portfolio_visitors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(100) UNIQUE NOT NULL,
    first_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    language_selected VARCHAR(10),
    country VARCHAR(10),
    device_type VARCHAR(20),
    visit_count INT DEFAULT 1,
    INDEX idx_visitors_session (session_id)
);

-- Table for tracking specific actions
CREATE TABLE IF NOT EXISTS portfolio_actions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    visitor_id INT,
    action_type VARCHAR(50) NOT NULL,
    action_details JSON DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (visitor_id) REFERENCES portfolio_visitors(id) ON DELETE SET NULL,
    INDEX idx_actions_type (action_type),
    INDEX idx_actions_created (created_at)
);

-- =============================================
-- Event Types:
-- =============================================
-- first_visit - When user selects language for first time
-- cv_download - When user downloads CV
-- cv_print - When user prints CV
-- certificate_view - When user views a certificate
-- certificate_click - When user clicks certificate link
-- project_view - When user views project details
-- project_click_github - When user clicks GitHub link
-- project_click_demo - When user clicks demo link
-- contact_submit - When user submits contact form
-- github_visit - When user visits GitHub profile
-- =============================================
