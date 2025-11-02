import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { Pencil, Trash2 } from 'lucide-react';

export default function ManageCourse() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', category: '', price: '' });
  const [loading, setLoading] = useState(true);
  const [editingLesson, setEditingLesson] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  async function fetchCourse() {
    try {
      const { data } = await api.get(`/courses/${id}`);
      setCourse(data);
      setForm({
        title: data.title || '',
        description: data.description || '',
        category: data.category || '',
        price: data.price || 0,
      });
    } catch (err) {
      console.error('Error fetching course:', err);
      alert('Error loading course');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await api.put(`/courses/${id}`, form);
      alert('✅ Course updated successfully!');
      fetchCourse(); // refresh data
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update course.');
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      await api.delete(`/courses/${id}`);
      alert('🗑️ Course deleted successfully.');
      navigate('/teacher');
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete course.');
    }
  }

  async function handleLessonDelete(lessonId) {
    if (!confirm('Delete this lesson?')) return;
    try {
      await api.delete(`/courses/${id}/lessons/${lessonId}`);
      fetchCourse();
    } catch (err) {
      console.error('Lesson delete failed:', err);
    }
  }

  async function handleLessonUpdate(lessonId, updates) {
    try {
      await api.put(`/courses/${id}/lessons/${lessonId}`, updates);
      setEditingLesson(null);
      fetchCourse();
    } catch (err) {
      console.error('Lesson update failed:', err);
    }
  }

  if (loading)
    return <div className="flex justify-center items-center min-h-[50vh] text-gray-500">Loading course...</div>;

  if (!course)
    return <div className="text-center text-red-500 mt-10">Course not found</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Course</h1>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium shadow"
        >
          Delete Course
        </button>
      </div>

      {/* --- Course Edit Form --- */}
      <form onSubmit={handleUpdate} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Course Title"
          className="w-full p-2 border rounded"
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          placeholder="Category"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="Price"
          className="w-full p-2 border rounded"
        />
        {course.thumbnailUrl && (
          <div className="mt-4">
            <p className="font-medium text-gray-700 mb-2">Current Thumbnail:</p>
            <img
              src={course.thumbnailUrl}
              alt="Course Thumbnail"
              className="w-60 h-36 object-cover rounded border"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Save Changes
        </button>
      </form>

      {/* --- Lessons Section --- */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Lessons</h2>

        {course.lessons?.length === 0 ? (
  <p className="text-gray-500">No lessons added yet.</p>
        ) : (
        course.lessons.map((lesson) => (
            <div
            key={lesson._id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4"
            >
            {/* --- Video Preview --- */}
            {lesson.videoUrl ? (
                <video
                src={lesson.videoUrl}
                controls
                className="w-full max-w-md rounded-lg border border-gray-300 dark:border-gray-600"
                >
                Your browser does not support the video tag.
                </video>
            ) : (
                <p className="text-gray-400 italic">No video uploaded</p>
            )}

            {/* --- Lesson Info / Edit / Delete --- */}
            {editingLesson === lesson._id ? (
                <div className="flex flex-col w-full gap-2">
                <input
                    type="text"
                    defaultValue={lesson.title}
                    onChange={(e) => (lesson.title = e.target.value)}
                    className="border p-2 rounded"
                />
                <textarea
                    defaultValue={lesson.description}
                    onChange={(e) => (lesson.description = e.target.value)}
                    className="border p-2 rounded"
                />
                <div className="flex justify-end gap-2">
                    <button
                    onClick={() => handleLessonUpdate(lesson._id, lesson)}
                    className="px-3 py-1 bg-teal-600 text-white rounded"
                    >
                    Save
                    </button>
                    <button
                    onClick={() => setEditingLesson(null)}
                    className="px-3 py-1 bg-gray-300 text-gray-800 rounded"
                    >
                    Cancel
                    </button>
                </div>
                </div>
            ) : (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                    <span className="font-semibold text-lg text-gray-800 dark:text-white">
                    {lesson.title}
                    </span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {lesson.duration} min • {lesson.description}
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                    onClick={() => setEditingLesson(lesson._id)}
                    className="text-blue-600 hover:text-blue-800"
                    >
                    <i className="fa fa-edit"></i> Edit
                    </button>
                    <button
                    onClick={() => handleLessonDelete(lesson._id)}
                    className="text-red-600 hover:text-red-800"
                    >
                    <i className="fa fa-trash"></i> Delete
                    </button>
                </div>
                </div>
            )}
            </div>
        ))
        )}

      </div>
    </div>
  );
}
