import { Link } from 'react-router-dom'
// I'm uncommenting these to show how to add the social icons
import { Zap, Facebook, Twitter, Github, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 p-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              {/* <Zap className="h-7 w-7 text-teal-500" /> */}
              <span className="text-xl font-bold text-white">
                Learnify
              </span>
            </Link>
            <p className="text-sm pr-4">
              Start learning new skills and achieve your goals with our expert-led courses.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Facebook" className="hover:text-teal-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-teal-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="GitHub" className="hover:text-teal-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-teal-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase text-gray-300">
              Company
            </h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-teal-400 transition-colors">About</Link></li>
              <li><Link to="/careers" className="hover:text-teal-400 transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-teal-400 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-teal-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase text-gray-300">
              Legal
            </h4>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-teal-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookie" className="hover:text-teal-400 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase text-gray-300">
              Subscribe
            </h4>
            <p className="mb-4 text-sm">
              Get the latest course updates and free resources delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="footer-email" className="sr-only">Email</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-slate-700 bg-slate-800 px-4 py-2 text-white placeholder-gray-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="rounded-md bg-teal-600 px-4 py-2 font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 border-t border-slate-700 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} YourCoursePlatform. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}