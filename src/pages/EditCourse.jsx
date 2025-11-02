import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import ThumbnailUploader from '../components/ThumbnailUploader';
import LessonUploader from '../components/LessonUploader';

export default function EditCourse() {
  const { id } = useParams(); // course id
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
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    try {
      await api.put(`/courses/${id}`, form);
      alert('✅ Course updated successfully!');
      navigate('/teacher');
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Failed to update course.');
    }
  }

  if (loading) return <div className="text-center py-10">Loading course...</div>;

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Edit Course
      </h1>

      <form onSubmit={handleSave} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Course Title"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          name="category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          placeholder="Category"
          className="w-full p-2 border rounded"
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="Price"
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg font-semibold"
        >
          Save Changes
        </button>
      </form>

      {/* Thumbnail Uploader */}
      <div className="mt-10">
        <ThumbnailUploader courseId={id} />
      </div>

      {/* Lesson Uploader */}
      <div className="mt-10">
        <LessonUploader courseId={id} />
      </div>
    </div>
  );
}
