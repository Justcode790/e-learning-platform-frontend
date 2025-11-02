import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';

export default function CourseDetail() {
  const { id } = useParams(); // course id
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  // console.log("By couDe",user)

  const [course, setCourse] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await api.get(`/courses/${id}`);
        const courseData = res.data;
        setCourse(courseData);

        // Check if the student already enrolled
        if (
          user &&
          Array.isArray(courseData.studentsEnrolled) &&
          courseData.studentsEnrolled.some(
            (studentId) => studentId.toString() === (user._id || user.id)
          )
        ) {
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
  }, [id, user]);

  // Handle course enrollment
  const handlePurchase = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setPurchaseLoading(true);
      const { data } = await api.post(`/students/enroll/${id}`);
      console.log('Enroll API response:', data);

      if (data.success) {
        alert('🎉 Course purchased successfully!');
        await refreshUser(); // refresh auth context data
        setIsPurchased(true);
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

  if (loading) {
    return <div className="flex justify-center items-center min-h-[50vh]">Loading course...</div>;
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-red-500">
        Course not found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Course Details Section --- */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-gray-700 dark:text-gray-300">
              Taught by{' '}
              <span className="font-semibold text-teal-600">
                {course.instructor?.name || 'Unknown Instructor'}
              </span>
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            {course.title}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{course.description}</p>

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
                    <span className="font-medium">{lesson.title}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {lesson.duration} min
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 dark:text-gray-400">No lessons available yet.</li>
              )}
            </ul>
          </div>
        </div>

        {/* --- Sidebar Section --- */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <img
              className="w-full h-56 object-cover"
              src={
                course.thumbnailUrl ||
                'https://res.cloudinary.com/demo/image/upload/sample.jpg'
              }
              alt={course.title}
            />
            <div className="p-6">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                  ${course.price ?? 0}
                </span>
              </div>

              <span className="inline-block bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs font-semibold px-3 py-1 rounded-full mb-6">
                {course.category}
              </span>

              {isPurchased ? (
                <button
                  onClick={() => navigate(`/courses/${course._id}`)}
                  className="w-full font-semibold rounded-lg py-3 px-4 bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Start Learning
                </button>
              ) : (
                <button
                  onClick={handlePurchase}
                  disabled={purchaseLoading}
                  className="w-full font-semibold rounded-lg py-3 px-4 bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md disabled:opacity-50 transition-all duration-200"
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
