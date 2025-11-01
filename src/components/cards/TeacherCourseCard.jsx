import React from 'react'
import { Link } from 'react-router-dom'
import { Edit, Users, BookOpen } from 'lucide-react'

export default function TeacherCourseCard({ course }) {
  console.log(course.thumbnail);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <img
        className="w-full h-48 object-cover"
        src={course.thumbnail || 'https://via.placeholder.com/400x225.png?text=Course+Image'}
        alt={course.title}
      />
      <div className="p-6 flex flex-col flex-grow">
        <span className="inline-block bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
          {course.category}
        </span>
        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4 flex-grow line-clamp-2">
          {course.title}
        </h3>
        
        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 mb-5">
          <span className="flex items-center gap-2">
            <Users size={16} />
            {course.studentsEnrolled?.length || 0} Students
          </span>
          <span className="flex items-center gap-2">
            <BookOpen size={16} />
            {course.lessons?.length || 0} Lessons
          </span>
        </div>

        <Link
          to={`/courses/${course._id}/details`} // Links to public detail page
          className="block w-full text-center font-semibold rounded-lg py-3 px-4 transition-all duration-200 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <Edit size={16} className="inline mr-2" />
          Manage Course
        </Link>
      </div>
    </div>
  )
}