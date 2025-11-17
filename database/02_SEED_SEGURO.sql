-- ============================================================================
-- PASAPORTE DIGITAL UAI - SEED DATA SEGURO
-- Este script maneja duplicados automáticamente
-- ============================================================================

-- Badge Categories (INSERT con ON CONFLICT)
INSERT INTO badge_categories (name, slug, description, icon, color, order_index) VALUES
('Movilidad Internacional', 'movilidad', 'Experiencias de intercambio y movilidad estudiantil', '🌍', '#0D47A1', 1),
('Academia Global', 'academia', 'Conferencias, publicaciones y eventos académicos', '🎓', '#FFB300', 2),
('Colaboración Intercultural', 'colaboracion', 'Proyectos y trabajos colaborativos internacionales', '🤝', '#FF6F00', 3),
('Desarrollo de Competencias', 'competencias', 'Certificaciones y cursos internacionales', '📚', '#42A5F5', 4),
('Logros Especiales', 'logros', 'Premios, competencias y reconocimientos globales', '🏆', '#4CAF50', 5)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    color = EXCLUDED.color,
    order_index = EXCLUDED.order_index;

-- Badges - Movilidad Internacional
INSERT INTO badges (category_id, name, slug, description, criteria, points, icon, color, level) VALUES
((SELECT id FROM badge_categories WHERE slug = 'movilidad'), 'Explorer', 'explorer', 'Primera experiencia internacional', 'Completar tu primera actividad internacional', 10, '🌍', '#0D47A1', 'explorer'),
((SELECT id FROM badge_categories WHERE slug = 'movilidad'), 'Globetrotter', 'globetrotter', 'Viajero experimentado', 'Participar en 3+ experiencias internacionales', 20, '✈️', '#0D47A1', 'navigator'),
((SELECT id FROM badge_categories WHERE slug = 'movilidad'), 'World Citizen', 'world-citizen', 'Ciudadano del mundo', 'Visitar 5+ países diferentes', 30, '🗺️', '#0D47A1', 'ambassador'),
((SELECT id FROM badge_categories WHERE slug = 'movilidad'), 'Semester Abroad', 'semester-abroad', 'Semestre completo en el extranjero', 'Completar un intercambio semestral', 25, '🎒', '#0D47A1', 'navigator')
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    criteria = EXCLUDED.criteria,
    points = EXCLUDED.points,
    icon = EXCLUDED.icon,
    color = EXCLUDED.color,
    level = EXCLUDED.level;

-- Badges - Academia Global
INSERT INTO badges (category_id, name, slug, description, criteria, points, icon, color, level) VALUES
((SELECT id FROM badge_categories WHERE slug = 'academia'), 'Academic Star', 'academic-star', 'Primera conferencia internacional', 'Presentar en una conferencia internacional', 15, '⭐', '#FFB300', 'explorer'),
((SELECT id FROM badge_categories WHERE slug = 'academia'), 'Knowledge Seeker', 'knowledge-seeker', 'Aprendizaje continuo', 'Asistir a 5+ seminarios internacionales', 20, '📖', '#FFB300', 'navigator'),
((SELECT id FROM badge_categories WHERE slug = 'academia'), 'Research Pioneer', 'research-pioneer', 'Pionero en investigación', 'Publicar en revista internacional', 35, '🔬', '#FFB300', 'ambassador'),
((SELECT id FROM badge_categories WHERE slug = 'academia'), 'Keynote Speaker', 'keynote-speaker', 'Orador principal', 'Ser ponente principal en evento internacional', 40, '🎤', '#FFB300', 'global_leader')
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    criteria = EXCLUDED.criteria,
    points = EXCLUDED.points;

-- Badges - Colaboración Intercultural
INSERT INTO badges (category_id, name, slug, description, criteria, points, icon, color, level) VALUES
((SELECT id FROM badge_categories WHERE slug = 'colaboracion'), 'Cultural Bridge', 'cultural-bridge', 'Puente cultural', 'Completar proyecto intercultural', 15, '🌉', '#FF6F00', 'explorer'),
((SELECT id FROM badge_categories WHERE slug = 'colaboracion'), 'Team Global', 'team-global', 'Equipo internacional', 'Trabajar en equipo multinacional', 20, '👥', '#FF6F00', 'navigator'),
((SELECT id FROM badge_categories WHERE slug = 'colaboracion'), 'Mentor Internacional', 'mentor-internacional', 'Mentoría cross-cultural', 'Mentorar estudiantes internacionales', 25, '🤝', '#FF6F00', 'ambassador')
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description;

-- Badges - Desarrollo de Competencias
INSERT INTO badges (category_id, name, slug, description, criteria, points, icon, color, level) VALUES
((SELECT id FROM badge_categories WHERE slug = 'competencias'), 'Language Master', 'language-master', 'Maestro de idiomas', 'Certificación internacional de idioma', 20, '🗣️', '#42A5F5', 'explorer'),
((SELECT id FROM badge_categories WHERE slug = 'competencias'), 'Digital Nomad', 'digital-nomad', 'Nómada digital', 'Curso online internacional completo', 10, '💻', '#42A5F5', 'explorer'),
((SELECT id FROM badge_categories WHERE slug = 'competencias'), 'Innovation Award', 'innovation-award', 'Premio a la innovación', 'Certificación internacional relevante', 25, '💡', '#42A5F5', 'navigator')
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description;

-- Badges - Logros Especiales
INSERT INTO badges (category_id, name, slug, description, criteria, points, icon, color, level) VALUES
((SELECT id FROM badge_categories WHERE slug = 'logros'), 'Competition Winner', 'competition-winner', 'Ganador de competencia', 'Premio en competencia internacional', 35, '🥇', '#4CAF50', 'ambassador'),
((SELECT id FROM badge_categories WHERE slug = 'logros'), 'Leadership Excellence', 'leadership-excellence', 'Excelencia en liderazgo', 'Liderar equipo en proyecto internacional', 30, '👑', '#4CAF50', 'ambassador'),
((SELECT id FROM badge_categories WHERE slug = 'logros'), 'Impact Maker', 'impact-maker', 'Creador de impacto', 'Proyecto con impacto social global', 40, '🌟', '#4CAF50', 'global_leader')
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description;

-- Demo Users (con ON CONFLICT)
INSERT INTO users (email, password_hash, first_name, last_name, student_id, career, role) VALUES
('demo@uai.cl', '$2b$10$rC8Zvz7bj.7BqK5mX.KHOuY4QMzYj.qPxE6Y5JI1BRjKY2LxE7Zhy', 'María', 'González', '20245678', 'Ingeniería Comercial', 'student'),
('admin@uai.cl', '$2b$10$rC8Zvz7bj.7BqK5mX.KHOuY4QMzYj.qPxE6Y5JI1BRjKY2LxE7Zhy', 'Admin', 'UAI', 'ADMIN01', NULL, 'admin')
ON CONFLICT (email) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name;

-- Demo Activities (solo si el usuario demo existe y no tiene actividades)
INSERT INTO activities (user_id, title, description, activity_type, institution, country, city, start_date, end_date, points, status, latitude, longitude)
SELECT 
    u.id,
    'Intercambio Académico',
    'Semestre de intercambio en Barcelona estudiando Negocios Internacionales',
    'exchange',
    'Universidad de Barcelona',
    'España',
    'Barcelona',
    '2024-01-15'::date,
    '2024-06-30'::date,
    20,
    'approved',
    41.3851,
    2.1734
FROM users u
WHERE u.email = 'demo@uai.cl'
AND NOT EXISTS (
    SELECT 1 FROM activities a 
    WHERE a.user_id = u.id 
    AND a.title = 'Intercambio Académico'
);

INSERT INTO activities (user_id, title, description, activity_type, institution, country, city, start_date, end_date, points, status, latitude, longitude)
SELECT 
    u.id,
    'Conferencia Internacional de Negocios',
    'Presentación de paper sobre transformación digital',
    'conference',
    'HEC Paris',
    'Francia',
    'París',
    '2024-03-10'::date,
    '2024-03-12'::date,
    15,
    'approved',
    48.8566,
    2.3522
FROM users u
WHERE u.email = 'demo@uai.cl'
AND NOT EXISTS (
    SELECT 1 FROM activities a 
    WHERE a.user_id = u.id 
    AND a.title = 'Conferencia Internacional de Negocios'
);

-- Award badges (solo si no existen ya)
INSERT INTO user_badges (user_id, badge_id, activity_id)
SELECT 
    u.id,
    b.id,
    a.id
FROM users u
CROSS JOIN badges b
LEFT JOIN activities a ON a.user_id = u.id AND a.title = 'Intercambio Académico'
WHERE u.email = 'demo@uai.cl'
AND b.slug = 'explorer'
AND NOT EXISTS (
    SELECT 1 FROM user_badges ub 
    WHERE ub.user_id = u.id AND ub.badge_id = b.id
);

INSERT INTO user_badges (user_id, badge_id, activity_id)
SELECT 
    u.id,
    b.id,
    a.id
FROM users u
CROSS JOIN badges b
LEFT JOIN activities a ON a.user_id = u.id AND a.title = 'Conferencia Internacional de Negocios'
WHERE u.email = 'demo@uai.cl'
AND b.slug = 'academic-star'
AND NOT EXISTS (
    SELECT 1 FROM user_badges ub 
    WHERE ub.user_id = u.id AND ub.badge_id = b.id
);

-- Update demo user stats
INSERT INTO user_stats (user_id, total_points, level, total_badges, total_activities, countries_visited)
SELECT 
    id,
    45,
    'navigator',
    2,
    2,
    2
FROM users 
WHERE email = 'demo@uai.cl'
ON CONFLICT (user_id) DO UPDATE SET
    total_points = 45,
    level = 'navigator',
    total_badges = 2,
    total_activities = 2,
    countries_visited = 2;

-- Refresh leaderboard
SELECT refresh_leaderboard();

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ Datos cargados exitosamente';
    RAISE NOTICE '📧 Usuario demo: demo@uai.cl';
    RAISE NOTICE '🔑 Contraseña: Demo123!';
    RAISE NOTICE '👤 Usuario admin: admin@uai.cl';
    RAISE NOTICE '🔑 Contraseña: Demo123!';
    RAISE NOTICE '';
    RAISE NOTICE '🎉 La base de datos está lista para usar';
END $$;
