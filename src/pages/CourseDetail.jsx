import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
// Add icons for a more professional look
// import { PlayCircle, Clock, User } from 'lucide-react'; 

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();

  const [course, setCourse] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  // --- Logic (Mostly Unchanged) ---
  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await api.get(`/courses/${id}`);
        const courseData = res.data;
        setCourse(courseData);

        // Check if user is enrolled
        if (user && courseData.studentsEnrolled?.includes(user._id)) {
          setIsPurchased(true);
        } else {
          setIsPurchased(false);
        }
      } catch (err) {
        console.error('Error fetching course:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, user]); // user dependency ensures re-check on login/logout

  const handlePurchase = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setPurchaseLoading(true);
      
      // *** LOGIC CORRECTION ***
      // Changed user.id to user._id to match the ID format 
      // used in the useEffect enrollment check.
      const { data } = await api.post(`/students/${user._id}/enroll/${id}`);
      
      if (data.success) {
        alert('🎉 Course purchased successfully!');
        await refreshUser(); // Refresh user context to get new enrolledCourses
        setIsPurchased(true); // Manually set state as well
      } else {
        alert(data.message || 'Purchase failed.');
      }
    } catch (err) {
      console.error('Error purchasing course:', err);
      alert('Failed to purchase course.');
    } finally {
      setPurchaseLoading(false);
    }
  };

  // --- Loading & Error States ---
  if (loading) {
    return <div className="flex justify-center items-center min-h-[50vh]">Loading course...</div>;
  }
  
  if (!course) {
    return <div className="flex justify-center items-center min-h-[50vh] text-red-500">Course not found.</div>;
  }

  // --- Attractive Layout (New JSX) ---
  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- 1. Main Content (Left Column) --- */}
        <div className="lg:col-span-2">
          {/* Instructor Info */}
          <div className="flex items-center gap-3 mb-4">
            {/* <User className="w-5 h-5 text-gray-500" /> */}
            <span className="text-gray-700 dark:text-gray-300">
              Taught by <span className="font-semibold text-teal-600">{course.instructor?.name || 'N/A'}</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            {course.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {course.description}
          </p>

          {/* Lessons Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-6">Course Content</h3>
            <ul className="space-y-3">
              {course.lessons && course.lessons.length > 0 ? (
                course.lessons.map((lesson, idx) => (
                  <li 
                    key={idx} 
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {/* <PlayCircle className="w-5 h-5 text-teal-500" /> */}
                      <span className="font-medium">{lesson.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      {/* <Clock className="w-4 h-4" /> */}
                      <span>{lesson.duration} min</span>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 dark:text-gray-400">No lessons available yet.</li>
              )}
            </ul>
          </div>
        </div>

        {/* --- 2. Action Card (Right Column) --- */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            
            {/* Course Image */}
            <img
              className="w-full h-56 object-cover"
              // src={course.thumbnailUrl || './React Foundamental.png'}
              src={'https://res.cloudinary.com/debc5aznw/image/upload/v1761926651/React_Foundamental_ersrpd.png'}
              alt={course.title}
            />

            <div className="p-6">
              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                  ${course.price ?? 0}
                </span>
                {/* <span className="text-gray-500 line-through">$99.99</span> */}
              </div>
              
              {/* Category Badge */}
              <span className="inline-block bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs font-semibold px-3 py-1 rounded-full mb-6 w-fit">
                {course.category}
              </span>

              {/* Purchase/Action Button */}
              {isPurchased ? (
                <button
                  onClick={() => navigate(`/courses/${course._id}`)}
                  className="w-full text-center font-semibold rounded-lg py-3 px-4 transition-all duration-200 bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow-md"
                >
                  Start Learning
                </button>
              ) : (
                <button
                  onClick={handlePurchase}
                  disabled={purchaseLoading}
                  className="w-full text-center font-semibold rounded-lg py-3 px-4 transition-all duration-200 bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {purchaseLoading ? 'Processing...' : 'Enroll Now'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}