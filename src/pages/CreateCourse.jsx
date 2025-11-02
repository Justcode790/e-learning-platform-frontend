import { useState } from 'react';
import api from '../api/api.js';
import { useNavigate } from 'react-router-dom';
import { Plus, UploadCloud, AlertCircle } from 'lucide-react';

export default function CreateCourse() {
  const [form, setForm] = useState({ title: '', description: '', category: 'General', price: 0 });
  const [lessons, setLessons] = useState([{ title: '', videoFile: null, duration: 5, description: '' }]);
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState('');
  const [thumbProgress, setThumbProgress] = useState(0);
  const [videoProgress, setVideoProgress] = useState({});
  const navigate = useNavigate();

  const addLesson = () =>
    setLessons((l) => [...l, { title: '', videoFile: null, duration: 0, description: '' }]);

  const updateLesson = (i, key, val) =>
    setLessons((l) => l.map((x, idx) => (idx === i ? { ...x, [key]: val } : x)));

  const inputStyle =
    'w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500';
  const labelStyle = 'block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1';

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');

      // 1️⃣ Upload thumbnail first
      let thumbnailUrl = '';
      if (thumbnail) {
        const thumbData = new FormData();
        thumbData.append('file', thumbnail);

        const { data: thumbRes } = await api.post('/media', thumbData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (e) => {
            setThumbProgress(Math.round((e.loaded * 100) / e.total));
          },
        });

        thumbnailUrl = thumbRes.url;
      }

      // 2️⃣ Upload all lesson videos before creating course
      const uploadedLessons = await Promise.all(
        lessons.map(async (lesson, i) => {
          let videoUrl = '';
          if (lesson.videoFile) {
            const videoData = new FormData();
            videoData.append('file', lesson.videoFile);

            const { data: videoRes } = await api.post('/media', videoData, {
              headers: { 'Content-Type': 'multipart/form-data' },
              onUploadProgress: (e) => {
                const percent = Math.round((e.loaded * 100) / e.total);
                setVideoProgress((prev) => ({ ...prev, [i]: percent }));
              },
            });
            videoUrl = videoRes.url;
          }

          return {
            title: lesson.title,
            description: lesson.description,
            duration: lesson.duration,
            videoUrl,
          };
        })
      );

      // 3️⃣ Now create course with uploaded URLs
      const { data: courseRes } = await api.post('/courses', {
        ...form,
        thumbnailUrl,
        lessons: uploadedLessons,
      });

      navigate(`/courses/${courseRes.course._id}`);
    } catch (error) {
      console.error('Error creating course:', error);
      setError('Failed to create course. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Create a New Course</h1>

      {error && (
        <div className="flex items-start gap-3 rounded-md border border-red-300 bg-red-50 p-4 mb-6 dark:border-red-700 dark:bg-red-900/20">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-8">
        {/* --- Course Details --- */}
        <div className="bg-white dark:bg-gray-800 p-6 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-6">Course Details</h2>
          <div className="space-y-5">
            <div>
              <label className={labelStyle}>Title</label>
              <input
                type="text"
                className={inputStyle}
                placeholder="e.g., Ultimate React Masterclass"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className={labelStyle}>Course Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-900 dark:text-white"
                onChange={(e) => setThumbnail(e.target.files[0])}
                required
              />
              {thumbProgress > 0 && (
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-teal-600 h-2.5 rounded-full"
                    style={{ width: `${thumbProgress}%` }}
                  ></div>
                </div>
              )}
            </div>
            <div>
              <label className={labelStyle}>Description</label>
              <textarea
                rows="4"
                className={inputStyle}
                placeholder="What will students learn in this course?"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelStyle}>Category</label>
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="e.g., Programming"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </div>
              <div>
                <label className={labelStyle}>Price ($)</label>
                <input
                  type="number"
                  min="0"
                  className={inputStyle}
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- Lessons --- */}
        <div className="bg-white dark:bg-gray-800 p-6 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Lessons</h2>
            <button
              type="button"
              onClick={addLesson}
              className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700"
            >
              <Plus size={16} /> Add Lesson
            </button>
          </div>
          <div className="space-y-6">
            {lessons.map((ls, i) => (
              <div key={i} className="border rounded-lg p-5 space-y-4">
                <div>
                  <label className={labelStyle}>Lesson Title</label>
                  <input
                    type="text"
                    className={inputStyle}
                    value={ls.title}
                    onChange={(e) => updateLesson(i, 'title', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyle}>Upload Video</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => updateLesson(i, 'videoFile', e.target.files[0])}
                    className="block w-full text-sm text-gray-900 dark:text-white"
                  />
                  {videoProgress[i] > 0 && (
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: `${videoProgress[i]}%` }}
                      ></div>
                    </div>
                  )}
                </div>
                <div>
                  <label className={labelStyle}>Duration (min)</label>
                  <input
                    type="number"
                    min="0"
                    className={inputStyle}
                    value={ls.duration}
                    onChange={(e) => updateLesson(i, 'duration', Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className={labelStyle}>Description</label>
                  <textarea
                    rows="3"
                    className={inputStyle}
                    value={ls.description}
                    onChange={(e) => updateLesson(i, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700"
          >
            <UploadCloud size={18} /> Create Course
          </button>
        </div>
      </form>
    </div>
  );
}
