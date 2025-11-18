import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, signOut, getCurrentUser } from '../lib/supabase'

interface UserStats {
  total_points: number
  level: string
  total_badges: number
  total_activities: number
  countries_visited: number
}

interface UserData {
  first_name: string
  last_name: string
  email: string
  avatar_url?: string
  student_id: string
  career?: string
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const user = await getCurrentUser()
      
      if (!user) {
        navigate('/login')
        return
      }

      // Obtener datos del usuario
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profile) {
        setUserData(profile)
      }

      // Obtener estadísticas
      const { data: userStats } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (userStats) {
        setStats(userStats)
      }

    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'explorer': return 'bg-green-100 text-green-800'
      case 'navigator': return 'bg-blue-100 text-blue-800'
      case 'ambassador': return 'bg-purple-100 text-purple-800'
      case 'global_leader': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelName = (level: string) => {
    switch (level) {
      case 'explorer': return 'Explorer'
      case 'navigator': return 'Navigator'
      case 'ambassador': return 'Ambassador'
      case 'global_leader': return 'Global Leader'
      default: return level
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌍</div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">🌍</div>
              <div>
                <h1 className="text-2xl font-bold text-blue-900">
                  Pasaporte Digital UAI
                </h1>
                <p className="text-sm text-gray-600">
                  ¡Bienvenido, {userData?.first_name}!
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {userData?.first_name?.charAt(0)}{userData?.last_name?.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {userData?.first_name} {userData?.last_name}
              </h2>
              <p className="text-gray-600">{userData?.career || 'Estudiante'}</p>
              <p className="text-sm text-gray-500">ID: {userData?.student_id}</p>
            </div>
            <div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getLevelColor(stats?.level || 'explorer')}`}>
                {getLevelName(stats?.level || 'explorer')}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Points */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Puntos Totales</p>
                <p className="text-3xl font-bold text-blue-900">
                  {stats?.total_points || 0}
                </p>
              </div>
              <div className="text-4xl">⭐</div>
            </div>
          </div>

          {/* Total Badges */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Badges Obtenidos</p>
                <p className="text-3xl font-bold text-purple-900">
                  {stats?.total_badges || 0}
                </p>
              </div>
              <div className="text-4xl">🏆</div>
            </div>
          </div>

          {/* Total Activities */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Actividades</p>
                <p className="text-3xl font-bold text-green-900">
                  {stats?.total_activities || 0}
                </p>
              </div>
              <div className="text-4xl">📚</div>
            </div>
          </div>

          {/* Countries Visited */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Países Visitados</p>
                <p className="text-3xl font-bold text-orange-900">
                  {stats?.countries_visited || 0}
                </p>
              </div>
              <div className="text-4xl">🌍</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Acciones Rápidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg transition-colors">
              <span className="text-xl">➕</span>
              <span className="font-medium">Nueva Actividad</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-3 rounded-lg transition-colors">
              <span className="text-xl">🏆</span>
              <span className="font-medium">Ver Badges</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-lg transition-colors">
              <span className="text-xl">👤</span>
              <span className="font-medium">Editar Perfil</span>
            </button>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Progreso hacia Próximo Nivel
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{getLevelName(stats?.level || 'explorer')}</span>
              <span>{stats?.total_points || 0} / 100 puntos</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
                style={{ width: `${Math.min(((stats?.total_points || 0) / 100) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {100 - (stats?.total_points || 0)} puntos más para el siguiente nivel
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Universidad Adolfo Ibáñez - Oficina de Internacionalización
          </p>
        </div>
      </footer>
    </div>
  )
}
