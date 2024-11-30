import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const ResetPasswordPage = () => {
  const [passwordDetails, setPasswordDetails] = useState({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const { token } = useParams(); 
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { password, confirmPassword } = passwordDetails;

    if (!password || !confirmPassword) {
      toast.error('All fields are necessary!');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Password and Confirm Password fields do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/reset-password/${token}`, { token, password });
      if (response.status === 201) {
        toast.success('Your password has been reset!');
        setTimeout(() => {navigate('/login')}, 1000);
      }
    } catch (error: any) {
      console.error('Error resetting password:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-700 h-screen flex items-center justify-center">
      <div className="bg-slate-800 rounded-lg shadow-2xl shadow-gray-800 w-full max-w-4xl flex h-4/6">
        <div className="hidden md:flex md:items-center md:justify-center w-1/2 h-full">
          <img
            src="/Images/ResetPassword.png"
            alt="Illustration"
            className="max-h-full max-w-full object-contain rounded-r-lg w-10/12"
          />
        </div>

        <div className="w-full max-w-md p-8 md:m-0 ml-auto mr-auto space-y-8 text-white flex flex-col justify-center items-stretch">
          <div>
            <h2 className="text-3xl font-bold text-center">Reset Your Password</h2>
            <p className="text-center text-sm text-gray-400 mt-2">
              Please enter your new password below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={passwordDetails.password}
                onChange={(e) => setPasswordDetails({...passwordDetails, password: e.target.value})}
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="********"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordDetails.confirmPassword}
                onChange={(e) => setPasswordDetails({...passwordDetails, confirmPassword: e.target.value})}
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="********"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-600 hover:bg-blue-500 focus:outline-none"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-sm">
                <a
                  onClick={() => navigate('/login')}
                  className="font-medium text-blue-500 hover:text-blue-400 cursor-pointer"
                >
                  &lt; Back to Login
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
