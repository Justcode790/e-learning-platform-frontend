import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';

export default function CourseDetail() {
  const { id } = useParams();

  const navigate = useNavigate();
  const { user,refreshUser  } = useAuth();


  const [course, setCourse] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        const courseData = res.data;
        // console.log(courseData)
        setCourse(courseData);

        if (user && courseData.studentsEnrolled?.includes(user._id)) {
          setIsPurchased(true);
        }
      } catch (err) {
        console.error('Error fetching course:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, user]);

  const handlePurchase = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setPurchaseLoading(true);
      console.log(id);
      console.log(user);
      const { data } = await api.post(`/students/${user.id}/enroll/${id}`);
      if (data.success) {
        setIsPurchased(true);
        alert('🎉 Course purchased successfully!');
        
        await refreshUser();

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

  if (loading) return <div className="text-center mt-10">Loading course...</div>;
  if (!course) return <div className="text-center mt-10 text-red-500">Course not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{course.description}</p>

      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          {course.category}
        </span>
        <span className="text-lg font-semibold">${course.price ?? 0}</span>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-1">Instructor:</h3>
        <p className="text-gray-700 dark:text-gray-300">{course.instructor?.name || 'N/A'}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-1">Lessons:</h3>
        <ul className="list-disc ml-5 text-gray-600 dark:text-gray-400">
          {course.lessons && course.lessons.length > 0 ? (
            course.lessons.map((lesson, idx) => (
              <li key={idx}>
                {lesson.title} ({lesson.duration} min)
              </li>
            ))
          ) : (
            <li>No lessons available yet.</li>
          )}
        </ul>
      </div>

      <div className="mt-6">
        {isPurchased ? (
          <button
            onClick={() => navigate(`/courses/${course._id}`)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Start Learning
          </button>
        ) : (
          <button
            onClick={handlePurchase}
            disabled={purchaseLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {purchaseLoading ? 'Processing...' : 'Purchase Course'}
          </button>
        )}
      </div>
    </div>
  );
}
