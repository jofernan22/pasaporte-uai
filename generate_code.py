#!/usr/bin/env python3
"""
GENERADOR AUTOMÁTICO DEL PASAPORTE DIGITAL UAI
===============================================
Este script genera TODA la aplicación completa:
- Frontend (React + TypeScript + Tailwind)
- Backend (Node.js + Express + Prisma)
- Database (PostgreSQL schemas)
- Configuraciones (Vercel, Docker, etc.)
- Documentación completa
"""

import os
import json
from pathlib import Path

# Colores para terminal
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_section(title):
    print(f"\n{Colors.HEADER}{Colors.BOLD}{'='*60}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{title:^60}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{'='*60}{Colors.ENDC}\n")

def print_success(message):
    print(f"{Colors.OKGREEN}✅ {message}{Colors.ENDC}")

def print_info(message):
    print(f"{Colors.OKCYAN}ℹ️  {message}{Colors.ENDC}")

BASE_DIR = Path("/home/claude/pasaporte-uai")

# ============================================================================
# FRONTEND FILES
# ============================================================================

FRONTEND_FILES = {
    # Vite config
    "frontend/vite.config.ts": """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Pasaporte Digital UAI',
        short_name: 'Pasaporte UAI',
        description: 'Sistema de reconocimiento de experiencias internacionales',
        theme_color: '#0D47A1',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})
""",

    # Tailwind config
    "frontend/tailwind.config.js": """/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'uai-blue': {
          DEFAULT: '#0D47A1',
          light: '#42A5F5',
          dark: '#01579B',
        },
        'uai-gold': {
          DEFAULT: '#FFB300',
          light: '#FFD54F',
          dark: '#FF6F00',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
""",

    # PostCSS config
    "frontend/postcss.config.js": """export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
""",

    # Index HTML
    "frontend/index.html": """<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Pasaporte Digital UAI - Sistema de reconocimiento de experiencias internacionales" />
    <meta name="theme-color" content="#0D47A1" />
    <title>Pasaporte Digital UAI</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
""",

    # Main CSS
    "frontend/src/index.css": """@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-gray-50 text-gray-900 font-sans;
  }
}

@layer components {
  .btn-primary {
    @apply bg-uai-blue text-white px-4 py-2 rounded-lg hover:bg-uai-blue-dark transition-colors font-medium;
  }
  
  .btn-secondary {
    @apply bg-white text-uai-blue border border-uai-blue px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium;
  }
  
  .card {
    @apply bg-white rounded-xl shadow-md p-6;
  }
  
  .badge-card {
    @apply bg-white rounded-lg border-2 p-4 transition-all hover:shadow-lg;
  }
}
""",

    # Main App
    "frontend/src/main.tsx": """import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4CAF50',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#FF6F00',
                secondary: '#fff',
              },
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
""",

    # App Component
    "frontend/src/App.tsx": """import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Badges from './pages/Badges'
import Activities from './pages/Activities'
import Profile from './pages/Profile'
import Map from './pages/Map'
import Analytics from './pages/Analytics'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {isAuthenticated ? (
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="badges" element={<Badges />} />
          <Route path="activities" element={<Activities />} />
          <Route path="map" element={<Map />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  )
}

export default App
""",

}

# Continúa en la siguiente parte...
print_section("GENERADOR DE CÓDIGO - PASAPORTE UAI")
print_info("Iniciando generación de archivos...")

# Crear archivos del frontend
for file_path, content in FRONTEND_FILES.items():
    full_path = BASE_DIR / file_path
    full_path.parent.mkdir(parents=True, exist_ok=True)
    full_path.write_text(content)
    print_success(f"Creado: {file_path}")

print_info(f"\\n✨ Archivos del frontend creados: {len(FRONTEND_FILES)}")
print_info("Continuando con más archivos...")
