import axios from 'axios'

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
  baseURL:'http://localhost:5000/api'
  // baseURL:'https://e-learning-platform-backend-psi.vercel.app/api'
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api


