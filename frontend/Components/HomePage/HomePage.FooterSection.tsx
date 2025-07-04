const FooterSection = () => {
  return (
    <footer id="contact-us" className="mt-20 text-white">
      <hr className='my-10 h-px w-full bg-slate-800 border-none shadow-lg shadow-white' />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <img src="/Images/Logo.png" alt="Expense Flow Logo" className="w-10 h-10" />
              <h3 className="text-xl font-bold">Expense Flow</h3>
            </div>
            <p className="text-gray-400 text-sm text-center md:text-left">
              Your trusted companion for effortless expense tracking and financial management.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="/login" className="hover:text-white transition-colors">Login</a></li>
              <li><a href="/register" className="hover:text-white transition-colors">Register</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="text-gray-400 space-y-2">
              <p>Hitanshu Variya</p>
              <p>Gandhinagar, Gujarat</p>
              <p>India</p>
              <p>Email: hjvariya1@gmail.com</p>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 py-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Expense Flow. Made with ❤️ By Group 19.</p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
