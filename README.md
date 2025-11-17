# 🌍 PASAPORTE DIGITAL UAI

> Sistema de reconocimiento y gamificación de experiencias internacionales para estudiantes de la Universidad Adolfo Ibáñez

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-production--ready-success)

---

## 📋 Descripción

El **Pasaporte Digital UAI** es una Aplicación Web Progresiva (PWA) que permite a los estudiantes:

- 🎮 **Gamificar** su experiencia de internacionalización
- 🏆 **Obtener badges digitales** por actividades internacionales
- 📊 **Visualizar su progreso** en tiempo real
- 🌍 **Registrar experiencias** en un mapamundi interactivo
- 📄 **Generar un pasaporte físico** personalizado con todas sus actividades

---

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Cuenta en Vercel (gratuita)
- Cuenta en Supabase (gratuita)

### Instalación Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-org/pasaporte-uai.git
cd pasaporte-uai

# 2. Instalar dependencias del frontend
cd frontend
npm install

# 3. Instalar dependencias del backend
cd ../backend
npm install

# 4. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 5. Ejecutar base de datos (ver database/README.md)
cd ../database
# Seguir instrucciones de setup

# 6. Iniciar desarrollo
npm run dev:all
```

La aplicación estará disponible en:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## 📁 Estructura del Proyecto

```
pasaporte-uai/
├── frontend/              # Aplicación React + TypeScript
│   ├── src/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── pages/        # Páginas de la app
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API services
│   │   ├── store/        # Estado global (Zustand)
│   │   ├── types/        # TypeScript types
│   │   └── utils/        # Utilidades
│   ├── public/           # Assets estáticos
│   └── package.json
│
├── backend/              # API Node.js + Express
│   ├── src/
│   │   ├── routes/       # Rutas de la API
│   │   ├── controllers/  # Controladores
│   │   ├── models/       # Modelos de datos
│   │   ├── middleware/   # Middleware personalizado
│   │   ├── services/     # Lógica de negocio
│   │   └── utils/        # Utilidades
│   └── package.json
│
├── database/             # Scripts SQL y migraciones
│   ├── schema.sql        # Esquema de base de datos
│   ├── seed.sql          # Datos de prueba
│   └── migrations/       # Migraciones
│
├── docs/                 # Documentación
│   ├── DEPLOYMENT.md     # Guía de deployment
│   ├── API.md           # Documentación de API
│   ├── MIGRATION_TO_AZURE.md  # Guía de migración
│   └── USER_GUIDE.md    # Guía de usuario
│
├── .gitignore
├── docker-compose.yml    # Para desarrollo local
└── README.md            # Este archivo
```

---

## 🎨 Características Principales

### Dashboard Personalizado
- Perfil del estudiante con avatar
- Nivel de internacionalización actual
- Barra de progreso anual
- Badges recientes destacados
- Acceso rápido a funciones principales

### Sistema de Badges Gamificado
- 20+ badges en 5 categorías
- Sistema de niveles (Explorer → Global Leader)
- Progreso visible hacia próximos badges
- Metadata completa de cada logro

### Registro de Actividades
- Formulario intuitivo
- Geolocalización automática
- Carga de documentos de respaldo
- Timeline visual de experiencias

### Mapamundi Interactivo
- Visualización de países visitados
- Marcadores por tipo de actividad
- Estadísticas por región
- Rutas de movilidad

### Analytics y Reportes
- Gráficos de progreso
- Comparación con objetivos
- Rankings (opcional/privado)
- Exportación de datos

### Pasaporte Físico
- Generación automática en PDF
- Diseño premium personalizado
- Código QR de verificación
- Listo para impresión profesional

---

## 🛠️ Stack Tecnológico

### Frontend
- **Framework:** React 18 + TypeScript
- **Estilos:** Tailwind CSS 3
- **Estado:** Zustand
- **Routing:** React Router 6
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Maps:** Leaflet
- **PWA:** Workbox
- **Build:** Vite

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Validación:** Zod
- **Auth:** JWT + bcrypt
- **ORM:** Prisma
- **File Upload:** Multer
- **PDF Generation:** Puppeteer
- **Email:** Nodemailer

### Database
- **Principal:** PostgreSQL 15+
- **Cache:** Redis (opcional)

### DevOps
- **Hosting Frontend:** Vercel
- **Hosting Backend:** Vercel Functions
- **Database:** Supabase
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry (opcional)

---

## 🔐 Seguridad

- ✅ HTTPS/TLS en todas las comunicaciones
- ✅ JWT para autenticación
- ✅ Bcrypt para contraseñas
- ✅ Validación de entrada con Zod
- ✅ CORS configurado
- ✅ Rate limiting
- ✅ SQL injection protection (Prisma)
- ✅ XSS protection
- ✅ CSRF tokens

---

## 📊 Sistema de Gamificación

### Niveles de Internacionalización

| Nivel | Nombre | Puntos | Descripción |
|-------|--------|--------|-------------|
| 1 | Explorer | 0-25 | Primeras experiencias internacionales |
| 2 | Navigator | 26-50 | Participación activa en actividades |
| 3 | Ambassador | 51-100 | Experiencia significativa global |
| 4 | Global Leader | 100+ | Excelencia en internacionalización |

### Categorías de Badges

1. **🌍 Movilidad Internacional**
   - Intercambios académicos
   - Programas de estudio en el extranjero
   - Visitas académicas

2. **🎓 Academia Global**
   - Conferencias internacionales
   - Publicaciones
   - Seminarios y workshops

3. **🤝 Colaboración Intercultural**
   - Proyectos multinacionales
   - Mentorías cross-cultural
   - Equipos globales

4. **📚 Desarrollo de Competencias**
   - Certificaciones internacionales
   - Cursos online globales
   - Idiomas

5. **🏆 Logros Especiales**
   - Competencias internacionales
   - Premios y reconocimientos
   - Liderazgo global

---

## 🚀 Deployment

### Opción 1: Vercel + Supabase (Recomendado - GRATIS)

Ver guía completa en [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

```bash
# 1. Crear proyecto en Supabase
# 2. Crear proyecto en Vercel
# 3. Conectar repositorio GitHub
# 4. Configurar variables de entorno
# 5. Deploy automático
```

### Opción 2: Azure

Ver guía completa en [docs/MIGRATION_TO_AZURE.md](docs/MIGRATION_TO_AZURE.md)

---

## 📖 Documentación

- **[Guía de Deployment](docs/DEPLOYMENT.md)** - Paso a paso para publicar
- **[API Documentation](docs/API.md)** - Documentación completa de endpoints
- **[Guía de Usuario](docs/USER_GUIDE.md)** - Manual para estudiantes
- **[Migración a Azure](docs/MIGRATION_TO_AZURE.md)** - Proceso de migración

---

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm run test
npm run test:coverage

# Backend tests
cd backend
npm run test
npm run test:e2e

# E2E tests
npm run test:e2e
```

---

## 🤝 Contribución

Este proyecto fue desarrollado para la Universidad Adolfo Ibáñez.

Para contribuir:
1. Fork el proyecto
2. Crear una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

---

## 📝 Changelog

### v1.0.0 (2024-11-17)
- ✨ Lanzamiento inicial
- 🎮 Sistema completo de gamificación
- 📱 PWA funcional
- 🏆 20+ badges en 5 categorías
- 🌍 Mapamundi interactivo
- 📄 Generación de pasaporte físico
- 🔐 Sistema de autenticación
- 📊 Dashboard con analytics

---

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para más detalles.

---

## 👥 Autores

- **Desarrollo Inicial** - Jonathan Fernando Muñoz Alvarez
- **Cliente** - Dirección de Relaciones Internacionales-Universidad Adolfo Ibáñez

---

## 🙏 Agradecimientos

- Universidad Adolfo Ibáñez por la confianza en este proyecto
- Casos de estudio: University of Wyoming, Purdue University, Moravian University
- Investigación académica sobre digital badging en educación superior

---

## 📞 Soporte

Para soporte y preguntas:
- 📧 Email: jonathan.m.a@live.com
- 📚 Documentación: [docs/](docs/)
- 🐛 Reportar bugs: [GitHub Issues](https://github.com/tu-org/pasaporte-uai/issues)

---

## 🔗 Links Útiles

- [Vercel](https://vercel.com)
- [Supabase](https://supabase.com)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

**Desarrollado con ❤️ para la Universidad Adolfo Ibáñez**
