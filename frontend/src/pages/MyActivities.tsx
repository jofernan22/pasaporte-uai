import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, getCurrentUser } from '../lib/supabase'

interface Activity {
  id: string
  type: string
  country: string
  institution: string
  city: string | null
  start_date: string
  end_date: string
  duration_days: number
  description: string | null
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

const ACTIVITY_TYPE_LABELS: { [key: string]: string } = {
  exchange: 'Intercambio Académico',
  service: 'Servicio Internacional',
  competition: 'Competencia Internacional',
  conference: 'Conferencia/Congreso',
  research: 'Proyecto de Investigación',
  internship: 'Pasantía/Práctica',
  volunteer: 'Voluntariado',
  course: 'Curso/Workshop',
}

const STATUS_CONFIG = {
  pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
  approved: { label: 'Aprobada', color: 'bg-green-100 text-green-800', icon: '✅' },
  rejected: { label: 'Rechazada', color: 'bg-red-100 text-red-800', icon: '❌' },
}

export default function MyActivities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const navigate = useNavigate()

  useEffect(() => {
    loadActivities()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [activities, filterStatus, filterType])

  const loadActivities = async () => {
    try {
      const user = await getCurrentUser()
      if (!user) {
        navigate('/login')
        return
      }

      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setActivities(data || [])
    } catch (error) {
      console.error('Error loading activities:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...activities]

    if (filterStatus !== 'all') {
      filtered = filtered.filter(a => a.status === filterStatus)
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(a => a.type === filterType)
    }

    setFilteredActivities(filtered)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const deleteActivity = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta actividad?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('activities')
        .delete()
        .eq('id', id)

      if (error) throw error

      setActivities(activities.filter(a => a.id !== id))
    } catch (error) {
      console.error('Error deleting activity:', error)
      alert('Error al eliminar la actividad')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-gray-600">Cargando actividades...</p>
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
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Volver
              </button>
              <div>
                <h1 className="text-2xl font-bold text-blue-900">
                  Mis Actividades
                </h1>
                <p className="text-sm text-gray-600">
                  {activities.length} actividad{activities.length !== 1 ? 'es' : ''} registrada{activities.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/activities/new')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              + Nueva Actividad
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Filtros</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos</option>
                <option value="pending">Pendientes</option>
                <option value="approved">Aprobadas</option>
                <option value="rejected">Rechazadas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Actividad
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos</option>
                {Object.entries(ACTIVITY_TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Activities List */}
        {filteredActivities.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {activities.length === 0 ? '¡Empieza tu viaje internacional!' : 'No se encontraron actividades'}
            </h3>
            <p className="text-gray-600 mb-6">
              {activities.length === 0 
                ? 'Registra tu primera experiencia internacional' 
                : 'Intenta ajustar los filtros'}
            </p>
            {activities.length === 0 && (
              <button
                onClick={() => navigate('/activities/new')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                + Nueva Actividad
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {ACTIVITY_TYPE_LABELS[activity.type] || activity.type}
                        </h3>
                        <p className="text-gray-600">
                          {activity.institution}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${STATUS_CONFIG[activity.status].color}`}>
                        {STATUS_CONFIG[activity.status].icon} {STATUS_CONFIG[activity.status].label}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <span className="text-xl mr-2">🌍</span>
                        <div>
                          <p className="text-sm font-medium">País</p>
                          <p className="text-sm">{activity.country}{activity.city ? `, ${activity.city}` : ''}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="text-xl mr-2">📅</span>
                        <div>
                          <p className="text-sm font-medium">Fechas</p>
                          <p className="text-sm">
                            {formatDate(activity.start_date)} - {formatDate(activity.end_date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="text-xl mr-2">⏱️</span>
                        <div>
                          <p className="text-sm font-medium">Duración</p>
                          <p className="text-sm">{activity.duration_days} días</p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    {activity.description && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-700">{activity.description}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      {activity.status === 'pending' && (
                        <button
                          onClick={() => deleteActivity(activity.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          🗑️ Eliminar
                        </button>
                      )}
                      <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                        📄 Ver Detalles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
