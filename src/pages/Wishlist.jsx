import { useEffect, useState } from 'react'
import api from '../api/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import CourseCard from '../components/CourseCard.jsx'

export default function Wishlist() {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [wishlistChanged, setWishlistChanged] = useState(false) 

  useEffect(() => {
    if (!user?.id) return

    async function loadWishlist() {
      try {
        setLoading(true)
        const res = await api.get(`/students/${user.id}/wishlist`)
        setCourses(res.data?.wishlist || [])
      } catch (e) {
        console.error('Failed to load wishlist:', e)
      } finally {
        setLoading(false)
      }
    }

    loadWishlist()
  }, [wishlistChanged]) 

  const handleWishlistChange = () => {
    setWishlistChanged(prev => !prev)
  }

  if (loading) return <div className="mx-auto max-w-6xl">Loading...</div>

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-6 text-2xl font-semibold">My Wishlist</h1>
      {courses.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No courses in wishlist yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <CourseCard
              key={c._id}
              course={c}
              onWishlistChange={handleWishlistChange} 
            />
          ))}
        </div>
      )}
    </div>
  )
}
