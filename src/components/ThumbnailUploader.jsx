import { useState } from 'react';
import api from '../api/api';

export default function ThumbnailUploader({ courseId }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select an image.');

    const formData = new FormData();
    formData.append('thumbnail', file);

    try {
      const { data } = await api.post(`/courses/${courseId}/thumbnail`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('✅ Thumbnail uploaded successfully!');
      setPreview(data.thumbnailUrl);
    } catch (error) {
      console.error('Thumbnail upload failed:', error);
      alert('Failed to upload thumbnail.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
        Upload Course Thumbnail
      </h2>

      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <button
        onClick={handleUpload}
        className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        Upload
      </button>

      {preview && (
        <img
          src={preview}
          alt="Thumbnail Preview"
          className="mt-4 w-64 rounded-lg shadow-lg border"
        />
      )}
    </div>
  );
}
