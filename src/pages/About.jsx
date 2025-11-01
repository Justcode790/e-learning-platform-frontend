import { Link } from 'react-router-dom'
import { Award, Clock, BookOpen, Users } from 'lucide-react'

// Placeholder data for the team
const teamMembers = [
  {
    name: 'Ankit Kumar',
    role: 'Founder & CEO',
    bio: 'Passionate about making high-quality education accessible to everyone.',
    imageUrl: 'https://res.cloudinary.com/debc5aznw/image/upload/v1758090103/scrapbook/hic5d4xpv1s0vex131zx.jpg',
  },
  {
    name: 'Ayush Singh',
    role: 'Head of Engineering',
    bio: 'Building a stable, scalable, and seamless learning experience.',
    imageUrl: 'https://res.cloudinary.com/debc5aznw/image/upload/v1762015983/ayush_abex5l.jpg',
  },
  {
    name: 'Tushar Kumar',
    role: 'Lead Instructor',
    bio: 'Dedicated to curating and creating courses that change lives.',
    imageUrl: 'https://res.cloudinary.com/debc5aznw/image/upload/v1762015982/tushar_xmmgnf.jpg',
  },
]

// Reusable component for feature cards
function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex-shrink-0 bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300 rounded-full p-5">
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  )
}

export default function About() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Section 1: Hero & Mission */}
      <div className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Our Mission: <span className="text-teal-600 dark:text-teal-400">Unlock Your Potential</span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300">
          At <span className="font-semibold text-teal-600">Learnify</span>, we believe that learning should be accessible, engaging, and transformative. Our mission is to connect curious minds with passionate experts and provide a platform for growth, one course at a time.
        </p>
      </div>

      {/* Section 2: Why Choose Us? */}
      <div className="bg-white dark:bg-gray-800 p-10 md:p-16 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Why Learn with Learnify?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard
            icon={<Award size={32} />}
            title="Expert Instructors"
            description="Learn from industry professionals who are vetted for their expertise and teaching quality."
          />
          <FeatureCard
            icon={<Clock size={32} />}
            title="Flexible Learning"
            description="Access your courses anytime, anywhere, on any device. Learn at your own pace."
          />
          <FeatureCard
            icon={<BookOpen size={32} />}
            title="Diverse Catalog"
            description="From programming to data science, and more, find the perfect course for your goals."
          />
        </div>
      </div>

      {/* Section 3: Meet the Team */}
      <div className="py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member) => (
            <div 
              key={member.name} 
              className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <img 
                className="mx-auto h-40 w-40 rounded-full object-cover shadow-md" 
                src={member.imageUrl} 
                alt={member.name} 
              />
              <h4 className="mt-5 text-2xl font-semibold text-gray-900 dark:text-white">
                {member.name}
              </h4>
              <p className="text-teal-600 dark:text-teal-400 font-medium">
                {member.role}
              </p>
              <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Call to Action (CTA) */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-12 md:p-20 rounded-2xl shadow-xl text-center my-16">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Join Our Community of Learners
        </h2>
        <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Whether you're looking to start a new career or just learn a new hobby, we have the perfect course for you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/" 
            className="inline-block bg-white text-teal-600 font-semibold rounded-lg py-3 px-8 shadow-md transition-transform hover:scale-105"
          >
            Browse All Courses
          </Link>
          <Link 
            to="/register" 
            className="inline-block bg-transparent border-2 border-white text-white font-semibold rounded-lg py-3 px-8 transition-transform hover:scale-105"
          >
            Become an Instructor
          </Link>
        </div>
      </div>

    </div>
  )
}