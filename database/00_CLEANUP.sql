-- ============================================================================
-- LIMPIEZA COMPLETA DE LA BASE DE DATOS
-- Ejecuta este script PRIMERO para eliminar todo
-- ============================================================================

-- Desactivar restricciones temporalmente
SET session_replication_role = 'replica';

-- Drop materialized views
DROP MATERIALIZED VIEW IF EXISTS leaderboard CASCADE;

-- Drop views
DROP VIEW IF EXISTS user_dashboard CASCADE;

-- Drop triggers
DROP TRIGGER IF EXISTS trigger_create_user_profile ON users CASCADE;
DROP TRIGGER IF EXISTS trigger_update_stats_on_badge_earned ON user_badges CASCADE;
DROP TRIGGER IF EXISTS trigger_update_stats_on_activity_approved ON activities CASCADE;
DROP TRIGGER IF EXISTS update_users_updated_at ON users CASCADE;
DROP TRIGGER IF EXISTS update_activities_updated_at ON activities CASCADE;
DROP TRIGGER IF EXISTS update_user_stats_updated_at ON user_stats CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS update_stats_on_badge_earned() CASCADE;
DROP FUNCTION IF EXISTS update_stats_on_activity_approved() CASCADE;
DROP FUNCTION IF EXISTS refresh_leaderboard() CASCADE;
DROP FUNCTION IF EXISTS create_user_profile() CASCADE;

-- Drop tables (en orden inverso por dependencias)
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS activity_comments CASCADE;
DROP TABLE IF EXISTS user_stats CASCADE;
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS user_badges CASCADE;
DROP TABLE IF EXISTS badges CASCADE;
DROP TABLE IF EXISTS badge_categories CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Reactivar restricciones
SET session_replication_role = 'origin';

-- Mensaje de éxito
DO $$
BEGIN
    RAISE NOTICE '✅ Base de datos limpiada exitosamente';
    RAISE NOTICE '📝 Ahora puedes ejecutar schema.sql';
END $$;
