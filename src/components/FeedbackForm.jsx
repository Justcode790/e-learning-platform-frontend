import { useState } from 'react'

export default function FeedbackForm({ onSubmit }) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ rating, comment })
      }}
      className="space-y-2"
    >
      <div>
        <label className="block text-sm">Rating</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="border rounded px-2 py-1 bg-transparent">
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm">Comment</label>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="w-full border rounded px-2 py-1 bg-transparent" rows={3} />
      </div>
      <button className="px-3 py-1 rounded bg-blue-600 text-white">Submit</button>
    </form>
  )
}




