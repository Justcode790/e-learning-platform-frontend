import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import TeacherDashboard from './pages/TeacherDashboard.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import CreateCourse from './pages/CreateCourse.jsx'
import PremiumCourseDetail from './pages/PremiumCourseDetail.jsx'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import CourseDetail from './pages/CourseDetail.jsx'
import Home from './components/Home/Home.jsx'
export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="flex">
        {/* <Sidebar /> */}
        <main className="flex-1 p-4">
          <Routes>
            {/* <Route path="/" element={<Home/>} /> */}
            <Route path="/" element={<Landing/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/teacher"
              element={
                <ProtectedRoute roles={["teacher"]}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/student"
              element={
                <ProtectedRoute roles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create-course"
              element={
                <ProtectedRoute roles={["teacher"]}>
                  <CreateCourse />
                </ProtectedRoute>
              }
            />
            
            <Route path="/courses/:id" element={
              <ProtectedRoute roles={["student"]}>
                <PremiumCourseDetail />
              </ProtectedRoute>
              } />

            <Route path="/courses/:id/details" element={
                <CourseDetail/>
              } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}