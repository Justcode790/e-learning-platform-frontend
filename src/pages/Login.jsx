import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('raj@student.com')
  const [password, setPassword] = useState('Student@123')
  const [role, setRole] = useState('student')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <form
        className="space-y-3"
        onSubmit={async (e) => {
          e.preventDefault()
          try {
            await login(email, password, role)
            const redirect = location.state?.from?.pathname || (role === 'teacher' ? '/teacher' : '/student')
            navigate(redirect, { replace: true })
          } catch (e) {
            setError('Invalid credentials')
          }
        }}
      >
        <div>
          <label className="block text-sm">Email</label>
          <input className="w-full border rounded px-3 py-2 bg-transparent" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" className="w-full border rounded px-3 py-2 bg-transparent" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border rounded px-3 py-2 bg-transparent">
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button className="px-3 py-2 rounded bg-blue-600 text-white">Login</button>
      </form>
      <p className="text-sm mt-3">No account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link></p>
    </div>
  )
}


