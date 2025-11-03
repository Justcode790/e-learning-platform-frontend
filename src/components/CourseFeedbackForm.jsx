import { useState } from 'react'

export default function CourseFeedbackForm({ onSubmit }) {
  const [rating, setRating] = useState(5)
  const [hover, setHover] = useState(0)
  const [comment, setComment] = useState('')

  const stars = [1,2,3,4,5]

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ rating, comment })
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Your Rating</label>
        <div className="flex items-center gap-2">
          {stars.map((n) => (
            <button
              key={n}
              type="button"
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(n)}
              className={`text-2xl ${ (hover || rating) >= n ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
              aria-label={`Rate ${n} star${n>1?'s':''}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-700"
          placeholder="Share your thoughts about this course"
        />
      </div>
      <button className="inline-flex items-center justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">
        Submit Feedback
      </button>
    </form>
  )
}


