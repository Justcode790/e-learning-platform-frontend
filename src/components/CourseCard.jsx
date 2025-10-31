import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function CourseCard({ course }) {
  const {user} = useAuth();
  const [isPurchased, setisPurchased] = useState(false);
  // if(user.)
  // console.log(user);

  useEffect(() => {
    if (user && user.role === 'student' && user.enrolledCourses) {
      const purchased = user.enrolledCourses.some(
        (id) => id.toString() === course._id.toString()
      );
      setIsPurchased(purchased);
    }
  }, [user, course]);

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded p-4 flex flex-col">
      <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">{course.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm">{course.category}</span>
        <span className="font-semibold">${course.price ?? 0}</span>
      </div>
      {user ? (
        isPurchased ? (
          <Link
            className="mt-3 inline-block text-green-600 hover:underline"
            to={`/courses/${course._id}`}
          >
            Continue Learning
          </Link>
        ) : (
          <Link
            className="mt-3 inline-block text-blue-600 hover:underline"
            to={`/courses/${course._id}/details`}
          >
            View Details
          </Link>
        )
      ) : (
        <Link
          className="mt-3 inline-block text-blue-600 hover:underline"
          to={`/courses/${course._id}/details`}
        >
          View Details
        </Link>
      )}
    </div>
  )
}


