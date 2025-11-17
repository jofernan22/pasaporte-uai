# 📊 BASE DE DATOS - PASAPORTE DIGITAL UAI

## 📁 ARCHIVOS DISPONIBLES

### ⚡ Scripts Recomendados (USAR ESTOS)

1. **`00_CLEANUP.sql`** - Limpia toda la base de datos
   - Usa este SOLO si quieres empezar de cero
   - Elimina todas las tablas, triggers y funciones

2. **`01_SCHEMA_SEGURO.sql`** ⭐ - Crea el schema (SEGURO)
   - NO falla si las tablas ya existen
   - Actualiza las que existan
   - Crea las que falten
   - **USA ESTE en lugar de schema.sql**

3. **`02_SEED_SEGURO.sql`** ⭐ - Inserta datos (SEGURO)
   - NO duplica datos
   - Actualiza si ya existen
   - **USA ESTE en lugar de seed.sql**

### 📜 Scripts Originales (Referencia)

- `schema.sql` - Schema original (puede fallar si las tablas existen)
- `seed.sql` - Seed original (puede duplicar datos)

---

## 🚀 ORDEN DE EJECUCIÓN

### Si es tu primera vez:

```
1. 01_SCHEMA_SEGURO.sql  ← Crea tablas
2. 02_SEED_SEGURO.sql    ← Inserta datos
```

### Si ya ejecutaste scripts antes y tuviste errores:

```
1. 00_CLEANUP.sql        ← Limpia todo
2. 01_SCHEMA_SEGURO.sql  ← Crea tablas
3. 02_SEED_SEGURO.sql    ← Inserta datos
```

---

## 📝 CÓMO EJECUTAR EN SUPABASE

1. Ve a tu proyecto en https://supabase.com
2. Click en **SQL Editor** (menú izquierdo)
3. Click en **New Query**
4. Copia y pega el contenido del archivo
5. Click en **RUN** (botón verde)
6. Espera el mensaje de éxito

---

## ✅ VERIFICAR QUE FUNCIONÓ

Después de ejecutar los scripts, verifica:

1. Ve a **Table Editor**
2. Deberías ver 8 tablas:
   - ✅ users
   - ✅ user_profiles
   - ✅ user_stats
   - ✅ badges
   - ✅ badge_categories
   - ✅ user_badges
   - ✅ activities
   - ✅ notifications

3. En la tabla `badges` deberías ver 20+ badges
4. En la tabla `users` deberías ver 2 usuarios demo

---

## 🔐 USUARIOS DEMO

Después de ejecutar los scripts tendrás:

**Estudiante:**
- Email: `demo@uai.cl`
- Password: `Demo123!`

**Admin:**
- Email: `admin@uai.cl`
- Password: `Demo123!`

---

## 🎯 ESTRUCTURA DE LA BASE DE DATOS

```
┌─────────────────┐
│     users       │ ← Usuarios del sistema
└────────┬────────┘
         │
         ├─────► user_profiles (datos extendidos)
         ├─────► user_stats (estadísticas)
         ├─────► activities (experiencias internacionales)
         └─────► user_badges (badges ganados)
                      │
                      └─────► badges
                                │
                                └─────► badge_categories
```

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### Error: "relation already exists"
→ Usa `01_SCHEMA_SEGURO.sql` en lugar de `schema.sql`

### Error: "duplicate key value"
→ Usa `02_SEED_SEGURO.sql` en lugar de `seed.sql`

### Quiero empezar de cero
→ Ejecuta primero `00_CLEANUP.sql`

---

## 📊 CARACTERÍSTICAS DEL SCHEMA

✅ **8 tablas relacionales**
✅ **Triggers automáticos** (actualización de stats)
✅ **Funciones PostgreSQL** (lógica de negocio)
✅ **Índices optimizados** (queries rápidos)
✅ **Vista materializada** (leaderboard)
✅ **Constraints** (integridad de datos)
✅ **Cascading deletes** (limpieza automática)

---

## 🎮 DATOS DE PRUEBA INCLUIDOS

- **5 categorías** de badges
- **20+ badges** predefinidos
- **2 usuarios** demo
- **2 actividades** de ejemplo
- **2 badges** ganados
- **Stats** actualizadas

---

**¿Listo para continuar?** Sigue con el deployment en Vercel.
Ver: `docs/DEPLOYMENT.md`
