-- ============================================================================
-- PASAPORTE DIGITAL UAI - SCHEMA SEGURO
-- Este script NO falla si las tablas ya existen
-- ============================================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- TABLES (con IF NOT EXISTS)
-- ============================================================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    student_id VARCHAR(50) UNIQUE NOT NULL,
    career VARCHAR(200),
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User profiles
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    phone VARCHAR(50),
    birth_date DATE,
    nationality VARCHAR(100),
    languages JSONB DEFAULT '[]'::jsonb,
    interests JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Badge categories
CREATE TABLE IF NOT EXISTS badge_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(50),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Badges
CREATE TABLE IF NOT EXISTS badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES badge_categories(id),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    criteria TEXT NOT NULL,
    points INTEGER DEFAULT 10,
    icon VARCHAR(50),
    color VARCHAR(50),
    level VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User badges
CREATE TABLE IF NOT EXISTS user_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activity_id UUID,
    metadata JSONB DEFAULT '{}'::jsonb,
    UNIQUE(user_id, badge_id)
);

-- Activities
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    activity_type VARCHAR(100) NOT NULL,
    institution VARCHAR(255),
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    start_date DATE NOT NULL,
    end_date DATE,
    points INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending',
    documents JSONB DEFAULT '[]'::jsonb,
    metadata JSONB DEFAULT '{}'::jsonb,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP,
    rejection_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activity comments
CREATE TABLE IF NOT EXISTS activity_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User stats
CREATE TABLE IF NOT EXISTS user_stats (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    total_points INTEGER DEFAULT 0,
    level VARCHAR(50) DEFAULT 'explorer',
    level_progress DECIMAL(5,2) DEFAULT 0,
    total_badges INTEGER DEFAULT 0,
    total_activities INTEGER DEFAULT 0,
    countries_visited INTEGER DEFAULT 0,
    total_hours INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_activity_date DATE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_read BOOLEAN DEFAULT false,
    action_url TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- INDEXES (crear solo si no existen)
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_student_id ON users(student_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_badge_id ON user_badges(badge_id);
CREATE INDEX IF NOT EXISTS idx_activities_user_id ON activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_status ON activities(status);
CREATE INDEX IF NOT EXISTS idx_activities_country ON activities(country);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION update_stats_on_badge_earned()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE user_stats 
    SET 
        total_badges = total_badges + 1,
        total_points = total_points + (SELECT points FROM badges WHERE id = NEW.badge_id)
    WHERE user_id = NEW.user_id;
    
    INSERT INTO notifications (user_id, title, message, type, metadata)
    VALUES (
        NEW.user_id,
        '¡Nuevo Badge Obtenido!',
        'Has ganado el badge: ' || (SELECT name FROM badges WHERE id = NEW.badge_id),
        'badge_earned',
        json_build_object('badge_id', NEW.badge_id)::jsonb
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_stats_on_activity_approved()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
        UPDATE user_stats 
        SET 
            total_activities = total_activities + 1,
            total_points = total_points + NEW.points,
            last_activity_date = NEW.end_date
        WHERE user_id = NEW.user_id;
        
        INSERT INTO notifications (user_id, title, message, type, metadata)
        VALUES (
            NEW.user_id,
            '¡Actividad Aprobada!',
            'Tu actividad "' || NEW.title || '" ha sido aprobada',
            'activity_approved',
            json_build_object('activity_id', NEW.id)::jsonb
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_profiles (user_id) 
    VALUES (NEW.id)
    ON CONFLICT DO NOTHING;
    
    INSERT INTO user_stats (user_id) 
    VALUES (NEW.id)
    ON CONFLICT DO NOTHING;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION refresh_leaderboard()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW leaderboard;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGERS (drop primero si existen)
-- ============================================================================

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_activities_updated_at ON activities;
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_stats_updated_at ON user_stats;
CREATE TRIGGER update_user_stats_updated_at BEFORE UPDATE ON user_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_stats_on_badge_earned ON user_badges;
CREATE TRIGGER trigger_update_stats_on_badge_earned
    AFTER INSERT ON user_badges
    FOR EACH ROW EXECUTE FUNCTION update_stats_on_badge_earned();

DROP TRIGGER IF EXISTS trigger_update_stats_on_activity_approved ON activities;
CREATE TRIGGER trigger_update_stats_on_activity_approved
    AFTER UPDATE ON activities
    FOR EACH ROW EXECUTE FUNCTION update_stats_on_activity_approved();

DROP TRIGGER IF EXISTS trigger_create_user_profile ON users;
CREATE TRIGGER trigger_create_user_profile
    AFTER INSERT ON users
    FOR EACH ROW EXECUTE FUNCTION create_user_profile();

-- ============================================================================
-- VIEWS
-- ============================================================================

CREATE OR REPLACE VIEW user_dashboard AS
SELECT 
    u.id,
    u.first_name,
    u.last_name,
    u.email,
    u.student_id,
    u.avatar_url,
    us.total_points,
    us.level,
    us.level_progress,
    us.total_badges,
    us.total_activities,
    us.countries_visited,
    (SELECT COUNT(*) FROM user_badges ub WHERE ub.user_id = u.id) as badges_earned,
    (SELECT COUNT(*) FROM badges WHERE is_active = true) as total_available_badges
FROM users u
LEFT JOIN user_stats us ON u.id = us.user_id;

-- Leaderboard (drop y recrear si existe)
DROP MATERIALIZED VIEW IF EXISTS leaderboard;
CREATE MATERIALIZED VIEW leaderboard AS
SELECT 
    u.id,
    u.first_name,
    u.last_name,
    u.student_id,
    u.avatar_url,
    us.total_points,
    us.level,
    us.total_badges,
    us.total_activities,
    us.countries_visited,
    ROW_NUMBER() OVER (ORDER BY us.total_points DESC, us.total_badges DESC) as rank
FROM users u
INNER JOIN user_stats us ON u.id = us.user_id
WHERE u.role = 'student'
ORDER BY us.total_points DESC;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ Schema creado/actualizado exitosamente';
    RAISE NOTICE '📝 Ahora puedes ejecutar seed.sql';
END $$;
