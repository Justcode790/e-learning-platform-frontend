import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const { register } = useAuth()
  const [name, setName] = useState('New User')
  const [email, setEmail] = useState('new@elearn.local')
  const [password, setPassword] = useState('Password@123')
  const [role, setRole] = useState('student')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Register</h1>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <form
        className="space-y-3"
        onSubmit={async (e) => {
          e.preventDefault()
          try {
            await register(name, email, password, role)
            navigate(role === 'teacher' ? '/teacher' : '/student', { replace: true })
          } catch (e) {
            setError('Registration failed')
          }
        }}
      >
        <div>
          <label className="block text-sm">Name</label>
          <input className="w-full border rounded px-3 py-2 bg-transparent" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
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
        <button className="px-3 py-2 rounded bg-blue-600 text-white">Register</button>
      </form>
      <p className="text-sm mt-3">Have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
    </div>
  )
}


