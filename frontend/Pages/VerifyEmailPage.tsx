import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const findFirstEmptyIndex = (code: string[]) : number => {
    for(let i=0; i<code.length; i++) {
        if(code[i] === "") {
            return i;
        }
    }

    return code.length;
};   

const VerifyEmailPage = () => {
  const [verificationCode,  setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  
  const handleChange = (index: number, value: string) => {
    const newVerificationCode = [...verificationCode];

    if(value.length > 1) {
        const pastedCode = value.slice(0, 6).split("");
        pastedCode.forEach((digit, index) => {
            newVerificationCode[index] = digit;
        })
        setVerificationCode(newVerificationCode);

        const firstEmptyIndex = findFirstEmptyIndex(newVerificationCode);
        inputRef.current[(firstEmptyIndex < 5) ? firstEmptyIndex : 5]?.focus();
    } else {
        newVerificationCode[index] = value;
        setVerificationCode(newVerificationCode);

        if(value && index < 5) {
            inputRef.current[index+1]?.focus();
        }
    }
  };

  const handleKeyDown = (index:number, e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Backspace" && !verificationCode[index] && index > 0) {
        inputRef.current[index - 1]?.focus();
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const ReceivedCode = verificationCode.join("");

    setLoading(true);  
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify-email`, {ReceivedCode}, {
          withCredentials: true
        });
        if(response.status === 201) {
          toast.success("Email verified successfully");
          setTimeout(() => {navigate('/login')}, 1000);
        }

    } catch (error: any) {
        console.error('Error logging in:', error.response?.data || error.message);
        const errorMessage = error.response?.data?.error || "An error occurred. Please try again.";
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
            src="../Utilities/Images/verify-email.png"
            alt="Email Verification Illustration"
            className="max-h-full max-w-full object-contain rounded-r-lg w-10/12"
          />
        </div>

        <div className="w-full max-w-md p-8 md:m-0 ml-auto mr-auto space-y-8 text-white flex flex-col justify-center items-stretch">
          <div>
            <h2 className="text-3xl font-bold text-center">Verify Your Email</h2>
            <p className="text-center text-sm text-gray-400 mt-2">
              Enter the 6-digit verification code sent to your email address to verify your account.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-center space-x-2">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRef.current[index] = el)}
                  type='text'
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 p-3 bg-gray-800 border border-gray-700 rounded-md text-center text-2xl focus:ring-blue-500 focus:border-blue-500"
                />
              ))}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-600 hover:bg-blue-500 focus:outline-none"
              >
                {loading ? "Verifying..." : "Verify Email"}
              </button>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-sm">
                <a
                  onClick={() => navigate("/login")}
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

export default VerifyEmailPage