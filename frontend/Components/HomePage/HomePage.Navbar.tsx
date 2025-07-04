import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onFeaturesClick: () => void;
  onContactClick: () => void;
}

const Navbar = ({ onFeaturesClick, onContactClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex justify-between items-center py-3">
      <div className="flex items-center">
        <img src="/Images/Logo.png" alt="Logo" className="w-10 md:w-14" />
        <p className="font-bold text-white text-xl md:text-2xl ml-2">Expense Flow</p>
      </div>

      <nav className="hidden lg:flex space-x-8 text-gray-400 text-sm font-mono">
        <ul className="flex flex-col lg:flex-row lg:space-x-8">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><button onClick={onFeaturesClick} className="hover:underline">Features</button></li>
          <li><button onClick={onContactClick} className="hover:underline">Contact</button></li>
        </ul>
      </nav>

      <div className="flex items-center space-x-3 md:space-x-4">
        <button onClick={() => navigate('/login')} className="bg-transparent text-white px-3 md:px-4 py-2 rounded-full hover:bg-gray-700">
          Login
        </button>
        <button onClick={() => navigate('/signup')} className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 md:px-4 py-2 rounded-full hover:opacity-90">
          Sign up
        </button>

        <div className="lg:hidden text-white text-2xl cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute right-4 top-20 flex flex-col items-center space-y-4 bg-gray-800 p-4 px-10 rounded-lg">
          <ul className="flex flex-col items-center space-y-4 text-gray-400 text-sm font-mono">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="/features" className="hover:underline">Features</a></li>
            <li><a href="/payments" className="hover:underline">Payments</a></li>
            <li><a href="/about" className="hover:underline">About us</a></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
