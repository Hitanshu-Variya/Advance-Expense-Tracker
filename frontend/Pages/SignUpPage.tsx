import { useState } from 'react';
import axios from 'axios';
import PasswordStrengthChecker from '../Components/PasswordStrengthChecker.tsx';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../src/config/axios';

const SignUpPage = () => {
  const [userDetails, setUserDetails] = useState({username: "", email: "", password: "", confirmPassword: ""});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/auth/signup', {
        username: userDetails.username,
        email: userDetails.email,
        password: userDetails.password,
        confirmPassword: userDetails.confirmPassword
      });
      
      if (response.data) {
        // Handle successful signup
        navigate('/verify-email');
        toast.success('Signup successful! Please verify your email.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          toast.error('Request timed out. Please try again.');
        } else {
          toast.error(error.response?.data?.message || 'Signup failed');
        }
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-700 h-screen flex items-center justify-center">
      <div className="bg-slate-800 rounded-lg shadow-2xl shadow-gray-800 w-full max-w-4xl flex">

        <div className="w-1/2 bg-cover bg-center rounded-xl m-2" style={{ backgroundImage: `url('https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}>
          <div className="h-full flex flex-col justify-between p-3 text-white">
            <button className="flex items-center ml-auto px-3 py-1 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
              <span onClick={() => {navigate('/')}}>Back to website &gt;</span>
            </button>
          </div>
        </div>

        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-4xl text-white font-bold mb-6">Create an account</h2>
          <p className="text-sm text-gray-400 mb-6">
            Already have an account? <a onClick={() => {navigate('/login')}} className="font-medium text-blue-500 hover:text-blue-400 cursor-pointer">Log in</a>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={userDetails.username}
                  onChange={(e) => setUserDetails({...userDetails, username: e.target.value})}
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={userDetails.email}
                onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
              />
              <input
                type="password"
                placeholder="Enter your password"
                value={userDetails.password}
                onChange={(e) => setUserDetails({...userDetails, password: e.target.value})}
                className="w-full px-4 py-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              />

              <input
                type="password"
                placeholder="Confirm password"
                value={userDetails.confirmPassword}
                onChange={(e) => setUserDetails({...userDetails, confirmPassword: e.target.value})}
                className="w-full px-4 py-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              />

              <PasswordStrengthChecker password={userDetails.password} />

              <button type='submit' className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition shadow-md">
                {loading ? 'Loading...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

