import { useState } from 'react';
import api from '../api/api';

export default function LessonUploader({ courseId }) {
  const [lesson, setLesson] = useState({
    title: '',
    description: '',
    duration: '',
  });
  const [video, setVideo] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!video) return alert('Select a video first.');

    const formData = new FormData();
    formData.append('video', video);
    formData.append('title', lesson.title);
    formData.append('description', lesson.description);
    formData.append('duration', lesson.duration);

    try {
      const { data } = await api.post(`/courses/${courseId}/lessons/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('✅ Lesson uploaded successfully!');
      console.log('Uploaded lesson:', data);
      setLesson({ title: '', description: '', duration: '' });
      setVideo(null);
    } catch (error) {
      console.error('Video upload failed:', error);
      alert('Failed to upload lesson.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Add New Lesson
      </h2>
      <form onSubmit={handleUpload} className="space-y-3">
        <input
          type="text"
          placeholder="Lesson Title"
          value={lesson.title}
          onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Lesson Description"
          value={lesson.description}
          onChange={(e) => setLesson({ ...lesson, description: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Duration (mins)"
          value={lesson.duration}
          onChange={(e) => setLesson({ ...lesson, duration: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Upload Lesson
        </button>
      </form>
    </div>
  );
}
