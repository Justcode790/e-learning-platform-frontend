import React from 'react';
import ReactPlayer from 'react-player';

export default function LessonPlayer({ url }) {
  if (!url) return null;
  return (
    <div className="aspect-video w-full rounded-md overflow-hidden bg-black">
      <ReactPlayer url={url} width="100%" height="100%" controls />
    </div>
  );
}


