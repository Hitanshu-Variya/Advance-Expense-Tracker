import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [loginDetails, setLoginDetails] = useState({email: "", password: ""});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, loginDetails, {
        withCredentials: true
      });
      if(response.status === 201) {
        navigate('/dashboard');
      }

    } catch (error: any) {
      console.error('Error logging in:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false); 
    }
  }

  return (
    <div className="bg-gray-700 h-screen flex items-center justify-center">
      <div className="bg-slate-800 rounded-lg shadow-2xl shadow-gray-800 w-full max-w-4xl flex">

        <div className="w-full max-w-md p-8 space-y-8 text-white">
          <div>
            <h2 className="text-3xl font-bold text-center">
              Hey, Welcome Back! <span className="inline-block">👋</span>
            </h2>
            <p className="text-center text-sm text-gray-400 mt-2">
              Welcome back, Fill in the information to start exploring!
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={loginDetails.email}
                onChange={(e) => setLoginDetails({...loginDetails, email: e.target.value})}
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="youremail@gmail.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={loginDetails.password}
                onChange={(e) => setLoginDetails({...loginDetails, password: e.target.value})}
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="********"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  onClick={() => {navigate('/forget-password')}}
                  className="font-medium text-blue-500 hover:text-blue-400 cursor-pointer"
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-600 hover:bg-blue-500 focus:outline-none"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>

          <div className="text-center text-gray-400">
            <p>
              Don't have an account yet?{" "}
              <span onClick={() => {navigate('/signup')}} className="text-blue-500 hover:text-blue-400 cursor-pointer">
                Create an account
              </span>
            </p>
          </div>
        </div>

        <div className="hidden lg:flex lg:items-center lg:justify-center w-1/2 h-full">
            <img
              src="../Utilities/Images/Login.png"
              alt="Illustration"
              className="max-h-full max-w-full object-contain rounded-r-lg mt-24"
            />
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
