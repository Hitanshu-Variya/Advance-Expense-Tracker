import { useState } from 'react';
import PasswordStrengthChecker from '../Components/PasswordStrengthChecker.tsx';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

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
            Already have an account? <a onClick={() => {navigate('/login')}} className="text-blue-400 hover:underline cursor-pointer">Log in</a>
          </p>

          <div className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />

            <PasswordStrengthChecker password={password} />
            <button className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition shadow-md">
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

