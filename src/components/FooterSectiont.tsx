import { FiTwitter, FiGithub, FiLinkedin } from "react-icons/fi";

export default function FooterSection() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-16 px-6 md:flex md:justify-between md:items-start gap-12">
        {/* Branding */}
        <div className="mb-10 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">BrainLY</h2>
          <p className="text-gray-600 max-w-xs">
            Organize your knowledge, supercharge your thinking, and collaborate smarter with BrainLY.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition">Integrations</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Follow Us</h3>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition"><FiTwitter size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition"><FiGithub size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition"><FiLinkedin size={20} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter & Copyright */}
      <div className="max-w-7xl mx-auto px-6 pb-8 border-t border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <form className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 w-full sm:w-auto"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Subscribe
          </button>
        </form>

        <p className="text-gray-500 text-sm text-center md:text-right">
          &copy; {new Date().getFullYear()} BrainLY. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
