import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { Pencil, Trash2, PlusCircle, UploadCloud } from 'lucide-react';
import EnrolledStudentsList from '../components/EnrolledStudentsList';

// A reusable Card component for styling
function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md ${className}`}
    >
      {children}
    </div>
  );
}

// A reusable Input component for styling
function FormInput({ label, id, ...props }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700"
      />
    </div>
  );
}

// A reusable Textarea component
function FormTextarea({ label, id, ...props }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label}
      </label>
      <textarea
        id={id}
        {...props}
        rows="4"
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700"
      />
    </div>
  );
}

export default function ManageCourse() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
  });
  const [loading, setLoading] = useState(true);

  // --- Lesson Management State ---
  const [editingLesson, setEditingLesson] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: '', description: '' });
  const [newLessonForm, setNewLessonForm] = useState({
    title: '',
    description: '',
    duration: '',
  });
  const [lessonVideo, setLessonVideo] = useState(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [thumbProgress, setThumbProgress] = useState(0);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  async function fetchCourse() {
    try {
      setLoading(true);
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
      fetchCourse();
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update course.');
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) return;
    try {
      await api.delete(`/courses/${id}`);
      alert('🗑️ Course deleted successfully.');
      navigate('/teacher');
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete course.');
    }
  }

async function handleThumbnailUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append('file', file);

    // Step 1: Upload to /media with progress tracking
    const { data: uploadRes } = await api.post('/media', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => {
        const percent = Math.round((e.loaded * 100) / e.total);
        setThumbProgress(percent);
      },
    });

    // Step 2: Update the course thumbnail in DB
    await api.put(`/courses/${id}/thumbnail`, { thumbnailUrl: uploadRes.url });

    alert('✅ Thumbnail updated successfully!');
    setThumbProgress(0);
    fetchCourse();
  } catch (err) {
    console.error('Thumbnail upload failed:', err);
    alert('❌ Failed to update thumbnail.');
    setThumbProgress(0);
  }
}


  // --- Add New Lesson Handler ---
  async function handleLessonAdd(e) {
    e.preventDefault();
    if (!newLessonForm.title.trim()) return alert('Lesson title is required.');

    try {
      let videoUrl = '';

      // 1️⃣ Upload video first
      if (lessonVideo) {
        const formData = new FormData();
        formData.append('file', lessonVideo);

        const { data: uploadRes } = await api.post('/media', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (e) =>
            setVideoProgress(Math.round((e.loaded * 100) / e.total)),
        });

        videoUrl = uploadRes.url;
      }

      // 2️⃣ Add lesson
      const payload = {
        title: newLessonForm.title,
        description: newLessonForm.description,
        duration: Number(newLessonForm.duration) || 0,
        videoUrl,
      };

      await api.post(`/courses/${id}/lessons`, payload);

      alert('✅ Lesson added successfully!');
      setNewLessonForm({ title: '', description: '', duration: '' });
      setLessonVideo(null);
      setVideoProgress(0);
      fetchCourse();
    } catch (err) {
      console.error('Lesson add failed:', err);
      alert(err.response?.data?.message || 'Failed to add lesson.');
    }
  }

  async function handleLessonUpdate(lessonId) {
    try {
      await api.put(`/courses/${id}/lessons/${lessonId}`, editFormData);
      setEditingLesson(null);
      fetchCourse();
    } catch (err) {
      console.error('Lesson update failed:', err);
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

  function startEdit(lesson) {
    setEditingLesson(lesson._id);
    setEditFormData({
      title: lesson.title,
      description: lesson.description,
    });
  }

  if (loading)
    return <div className="flex justify-center items-center min-h-[50vh] text-gray-500">Loading course...</div>;

  if (!course)
    return <div className="text-center text-red-500 mt-10">Course not found</div>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Course</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Update details, manage lessons, and configure settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Left Column --- */}
        <div className="lg:col-span-2 space-y-8">
          {/* --- Course Edit --- */}
          <Card>
            <h2 className="text-xl font-semibold mb-5 text-gray-900 dark:text-white">Course Details</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Course Title" id="title" type="text"
                  value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <FormInput label="Category" id="category" type="text"
                  value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              </div>
              <FormTextarea label="Description" id="description"
                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <FormInput label="Price ($)" id="price" type="number"
                value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              <button type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold shadow">
                Save Changes
              </button>
            </form>
          </Card>

          {/* --- Add New Lesson --- */}
          <Card>
            <h2 className="text-xl font-semibold mb-5 text-gray-900 dark:text-white">
              Add New Lesson
            </h2>
            <form onSubmit={handleLessonAdd} className="space-y-4">
              <FormInput
                label="Lesson Title"
                id="lessonTitle"
                type="text"
                value={newLessonForm.title}
                onChange={(e) => setNewLessonForm({ ...newLessonForm, title: e.target.value })}
                placeholder="e.g. Introduction to Hooks"
              />
              <FormTextarea
                label="Lesson Description"
                id="lessonDescription"
                value={newLessonForm.description}
                onChange={(e) => setNewLessonForm({ ...newLessonForm, description: e.target.value })}
                placeholder="What this lesson covers..."
              />
              <FormInput
                label="Duration (minutes)"
                id="lessonDuration"
                type="number"
                value={newLessonForm.duration}
                onChange={(e) => setNewLessonForm({ ...newLessonForm, duration: e.target.value })}
                placeholder="e.g. 15"
              />
              <div>
                <label
                  htmlFor="lessonVideo"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Upload Lesson Video
                </label>
                <input
                  id="lessonVideo"
                  type="file"
                  accept="video/*"
                  className="w-full text-sm text-gray-700 dark:text-gray-200"
                  onChange={(e) => setLessonVideo(e.target.files[0])}
                />
                {lessonVideo && (
                  <video
                    src={URL.createObjectURL(lessonVideo)}
                    controls
                    className="w-full max-w-sm rounded-lg border border-gray-300 dark:border-gray-600 mt-3"
                  />
                )}
                {videoProgress > 0 && (
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ width: `${videoProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow"
              >
                <PlusCircle size={18} />
                Add Lesson
              </button>
            </form>
          </Card>

          {/* --- Manage Lessons --- */}
          <Card>
            <h2 className="text-xl font-semibold mb-5 text-gray-900 dark:text-white">Manage Lessons</h2>
            <div className="space-y-6">
              {course.lessons?.length === 0 ? (
                <p className="text-gray-500">No lessons added yet.</p>
              ) : (
                course.lessons.map((lesson) => (
                  <div key={lesson._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
                    {editingLesson === lesson._id ? (
                      <div className="flex flex-col w-full gap-3">
                        <FormInput label="Title" id={`edit-title-${lesson._id}`} type="text"
                          value={editFormData.title}
                          onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })} />
                        <FormTextarea label="Description" id={`edit-desc-${lesson._id}`}
                          value={editFormData.description}
                          onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })} />
                        <div className="flex justify-end gap-2 mt-2">
                          <button onClick={() => handleLessonUpdate(lesson._id)}
                            className="px-4 py-1 bg-teal-600 text-white rounded-md text-sm font-medium">
                            Save
                          </button>
                          <button onClick={() => setEditingLesson(null)}
                            className="px-4 py-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md text-sm font-medium">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div className="flex-1 space-y-2">
                          <span className="font-semibold text-lg text-gray-800 dark:text-white">
                            {lesson.title}
                          </span>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {lesson.duration && `${lesson.duration} min • `}
                            {lesson.description}
                          </p>
                          {lesson.videoUrl ? (
                            <video
                              src={lesson.videoUrl}
                              controls
                              className="w-full max-w-sm rounded-lg border border-gray-300 dark:border-gray-600 mt-2"
                            />
                          ) : (
                            <p className="text-gray-400 italic text-sm mt-2">No video uploaded</p>
                          )}
                        </div>
                        <div className="flex gap-4 flex-shrink-0">
                          <button onClick={() => startEdit(lesson)}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                            <Pencil size={16} /> Edit
                          </button>
                          <button onClick={() => handleLessonDelete(lesson._id)}
                            className="flex items-center gap-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* --- Right Column (Thumbnail + Danger Zone) --- */}
        <div className="lg:col-span-1 space-y-8">
          {/* Thumbnail */}
          <Card>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Course Thumbnail</h2>
            {course.thumbnailUrl ? (
              <img
                src={course.thumbnailUrl}
                alt="Course Thumbnail"
                className="w-full h-48 object-cover rounded-md border border-gray-300 dark:border-gray-600 mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-400 mb-4">
                No Thumbnail
              </div>
            )}
            <label
              htmlFor="thumbnail-upload"
              className="cursor-pointer w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg font-medium"
            >
              <UploadCloud size={18} />
              Update Thumbnail
            </label>
            {thumbProgress > 0 && (
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
              <div
                className="bg-teal-600 h-2.5 rounded-full transition-all duration-200"
                style={{ width: `${thumbProgress}%` }}
              ></div>
            </div>
          )}

            <input
              id="thumbnail-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleThumbnailUpload}
            />
          </Card>

          <EnrolledStudentsList courseId={id}/>

          {/* Danger Zone */}
          <Card className="border border-red-400 dark:border-red-600">
            <h2 className="text-xl font-semibold mb-3 text-red-700 dark:text-red-400">Danger Zone</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Deleting this course will remove all of its content and lessons permanently.
            </p>
            <button
              onClick={handleDelete}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium shadow"
            >
              Delete This Course
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
