# 📦 GUÍA DE DEPLOYMENT - VERCEL + SUPABASE

## ✅ PASO 1: Crear Cuenta en Supabase (2 minutos)

1. Ve a https://supabase.com
2. Click en "Start your project"
3. Inicia sesión con GitHub
4. Click en "New Project"
   - Name: `pasaporte-uai`
   - Database Password: Guarda esta contraseña
   - Region: South America (São Paulo)
5. Espera 2 minutos mientras se crea

## ✅ PASO 2: Configurar Base de Datos (5 minutos)

1. En Supabase, ve a SQL Editor
2. Copia y pega el contenido de `database/schema.sql`
3. Click en "RUN"
4. Copia y pega el contenido de `database/seed.sql`
5. Click en "RUN"

## ✅ PASO 3: Obtener Credenciales de Supabase

1. Ve a Settings → API
2. Copia estos valores:
   - Project URL
   - anon/public key
   - service_role key (secret)

## ✅ PASO 4: Subir Código a GitHub

```bash
# En tu computador
cd pasaporte-uai
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/pasaporte-uai.git
git push -u origin main
```

## ✅ PASO 5: Deploy en Vercel (3 minutos)

1. Ve a https://vercel.com
2. Click en "Add New Project"
3. Importa tu repositorio de GitHub
4. Configure:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Variables de Entorno:**
   ```
   VITE_API_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
   ```

6. Click en "Deploy"
7. Espera 2-3 minutos

## ✅ PASO 6: Deploy del Backend

1. En Vercel, ve a tu proyecto
2. Settings → Functions
3. Verifica que las Serverless Functions estén habilitadas
4. El backend se desplegará automáticamente en `/api/*`

## 🎉 ¡LISTO!

Tu aplicación estará disponible en:
`https://tu-proyecto.vercel.app`

## 🔧 Troubleshooting

**Error: Base de datos no conecta**
→ Verifica las variables de entorno en Vercel

**Error: 404 en API**
→ Verifica que el backend esté en la carpeta correcta

**Error: Build falla**
→ Revisa los logs en Vercel dashboard

