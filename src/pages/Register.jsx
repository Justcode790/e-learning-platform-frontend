import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Zap, AlertCircle } from 'lucide-react'

export default function Register() {
  const { register } = useAuth()
  const [name, setName] = useState('New User')
  const [email, setEmail] = useState('new@elearn.local')
  const [password, setPassword] = useState('Password@123')
  const [role, setRole] = useState('student')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const inputStyle = "w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await register(name, email, password, role)
      navigate(role === 'teacher' ? '/teacher' : '/student', { replace: true })
    } catch (e) {
      setError('Registration failed')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col items-center">
          
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create your account
          </h2>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-2xl sm:px-10 border border-gray-200 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="flex items-start gap-3 rounded-md border border-red-300 bg-red-50 p-3 dark:border-red-700 dark:bg-red-900/20">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
                <p className="text-sm font-medium text-red-700 dark:text-red-300">
                  {error}
                </p>
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className={inputStyle}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={inputStyle}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={inputStyle}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Sign up as
              </label>
              <div className="mt-1">
                <select
                  id="role"
                  name="role"
                  required
                  className={inputStyle}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
            Have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-teal-600 hover:text-teal-500 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}