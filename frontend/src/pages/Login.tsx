import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        navigate('/dashboard')
      }
    } catch (error: any) {
      setError(error.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Logo y Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🌍</div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Pasaporte Digital UAI
          </h1>
          <p className="text-gray-600 text-sm">
            Inicia sesión para acceder a tu perfil
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="tu@uai.cl"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Regístrate aquí
            </button>
          </p>
          <button
            onClick={() => navigate('/forgot-password')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center mb-2">
            Credenciales de prueba:
          </p>
          <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600">
            <p>📧 Email: demo@uai.cl</p>
            <p>🔑 Password: Demo123!</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Universidad Adolfo Ibáñez</p>
          <p>Oficina de Internacionalización</p>
        </div>
      </div>
    </div>
  )
}
