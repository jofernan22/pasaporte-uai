import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, getCurrentUser } from '../lib/supabase'

const ACTIVITY_TYPES = [
  { value: 'exchange', label: 'Intercambio Académico' },
  { value: 'service', label: 'Servicio Internacional' },
  { value: 'competition', label: 'Competencia Internacional' },
  { value: 'conference', label: 'Conferencia/Congreso' },
  { value: 'research', label: 'Proyecto de Investigación' },
  { value: 'internship', label: 'Pasantía/Práctica' },
  { value: 'volunteer', label: 'Voluntariado' },
  { value: 'course', label: 'Curso/Workshop' },
]

const COUNTRIES = [
  'Argentina', 'Brasil', 'Chile', 'Colombia', 'México', 'Perú',
  'España', 'Francia', 'Alemania', 'Italia', 'Reino Unido',
  'Estados Unidos', 'Canadá', 'Australia', 'Nueva Zelanda',
  'China', 'Japón', 'Corea del Sur', 'Singapur',
]

export default function NewActivity() {
  const [formData, setFormData] = useState({
    type: '',
    country: '',
    institution: '',
    city: '',
    startDate: '',
    endDate: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    if (!formData.type || !formData.country || !formData.institution || !formData.startDate || !formData.endDate) {
      setError('Por favor completa todos los campos obligatorios')
      return false
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setError('La fecha de inicio debe ser anterior a la fecha de fin')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const user = await getCurrentUser()
      if (!user) {
        throw new Error('No hay sesión activa')
      }

      // Calcular duración en días
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const durationDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

      // Insertar actividad
      const { error: activityError } = await supabase
        .from('activities')
        .insert({
          user_id: user.id,
          type: formData.type,
          country: formData.country,
          institution: formData.institution,
          city: formData.city || null,
          start_date: formData.startDate,
          end_date: formData.endDate,
          duration_days: durationDays,
          description: formData.description || null,
          status: 'pending'
        })

      if (activityError) throw activityError

      // Redirigir a mis actividades
      navigate('/activities')
      
    } catch (error: any) {
      console.error('Error al crear actividad:', error)
      setError(error.message || 'Error al crear la actividad. Por favor intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
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
                  Nueva Actividad
                </h1>
                <p className="text-sm text-gray-600">
                  Registra tu experiencia internacional
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo de Actividad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Actividad <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecciona un tipo</option>
                {ACTIVITY_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* País e Institución */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  País <span className="text-red-500">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecciona un país</option>
                  {COUNTRIES.map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ciudad
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Madrid"
                />
              </div>
            </div>

            {/* Institución */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institución <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Universidad Complutense de Madrid"
                required
              />
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Inicio <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Fin <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe tu experiencia, aprendizajes y logros..."
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Guardando...' : 'Crear Actividad'}
              </button>
            </div>
          </form>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              💡 Información
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Tu actividad será revisada por el equipo de Internacionalización</li>
              <li>• Recibirás una notificación cuando sea aprobada</li>
              <li>• Las actividades aprobadas suman puntos y pueden otorgar badges</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
