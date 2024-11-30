import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/forget-password`, {email});
            if(response.status === 201) {
                setTimeout(() => {toast.success('Password Reset Link has been sent!')}, 1000);
            }

        } catch (error: any) {
            console.error('Error logging in:', error.response?.data || error.message);
            const errorMessage = error.response?.data?.error || 'An error occurred. Please try again.';
            toast.error(errorMessage);
        } finally {
            setTimeout(() => {setLoading(false)}, 1000);
        }
    }

    return (
    <div className="bg-gray-700 h-screen flex items-center justify-center">
        <div className="bg-slate-800 rounded-lg shadow-2xl shadow-gray-800 w-full max-w-4xl flex h-4/6">
            <div className="hidden md:flex md:items-center md:justify-center w-1/2 h-full">
                <img
                src="/Images/ForgetPassword.png"
                alt="Illustration"
                className="max-h-full max-w-full object-contain rounded-r-lg w-10/12"
                />
            </div>

            <div className="w-full max-w-md p-8 md:m-0 ml-auto mr-auto space-y-8 text-white flex flex-col justify-center items-stretch">
                <div>
                    <h2 className="text-3xl font-bold text-center">
                    Forget Your password?
                    </h2>
                    <p className="text-center text-sm text-gray-400 mt-2">
                    Enter the email associated with your account and we'll send a link to reset you password!
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="youremail@gmail.com"
                    />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-600 hover:bg-blue-500 focus:outline-none"
                        >
                            {loading ? "Loading..." : "Reset Password"}
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
  )
}

export default ForgetPasswordPage