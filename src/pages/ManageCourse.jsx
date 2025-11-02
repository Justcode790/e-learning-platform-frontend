import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import ThumbnailUploader from '../components/ThumbnailUploader';
import LessonUploader from '../components/LessonUploader';

export default function ManageCourse() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', category: '', price: '' });
  const [loading, setLoading] = useState(true);

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
      navigate('/teacher');
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

  if (loading)
    return <div className="flex justify-center items-center min-h-[50vh] text-gray-500">Loading course...</div>;

  if (!course)
    return <div className="text-center text-red-500 mt-10">Course not found</div>;

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Course</h1>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium shadow"
        >
          Delete Course
        </button>
      </div>

      {/* --- Edit Form --- */}
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
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Save Changes
        </button>
      </form>

      {/* --- Upload Thumbnail --- */}
      <div className="mt-10">
        <ThumbnailUploader courseId={id} />
      </div>

      {/* --- Upload Lessons --- */}
      <div className="mt-10">
        <LessonUploader courseId={id} />
      </div>
    </div>
  );
}
