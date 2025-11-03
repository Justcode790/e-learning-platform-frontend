import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../api/api';


export default function EnrolledStudentsList({ courseId }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudents() {
      try {
        const { data } = await api.get(`/courses/${courseId}/enrolled-students`);
        console.log(data);
        setStudents(data.students);
      } catch (err) {
        console.error("Error loading students:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStudents();
  }, [courseId]);

  if (loading) return <p className="text-gray-500 text-sm">Loading students...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
        👩‍🎓 Enrolled Students
      </h2>
      {students.length === 0 ? (
        <p className="text-gray-500 text-sm">No students enrolled yet.</p>
      ) : (
        <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
          {students.map((s) => (
            <div
              key={s._id}
              className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              <img
                src={s.profilePic || '/default-avatar.png'}
                alt={s.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-500"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{s.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{s.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
