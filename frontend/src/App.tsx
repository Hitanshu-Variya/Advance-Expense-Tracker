import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../Pages/ProtectedRoutes.tsx';
import LandingPage from "../Pages/LandingPage.tsx"
import SignUpPage from "../Pages/SignUpPage.tsx";
import VerifyEmailPage from '../Pages/VerifyEmailPage.tsx'
import LoginPage from "../Pages/LoginPage.tsx";
import ForgetPasswordPage from "../Pages/ForgetPasswordPage.tsx"
import ResetPasswordPage from "../Pages/ResetPasswordPage.tsx"
import Dashboard from '../Pages/Dashboard.tsx'
import Expense from '../Pages/Transaction.tsx';
import Budget from '../Pages/Budget.tsx';
import Profile from '../Pages/Profile.tsx';
import ContactUs from '../Pages/ContactUs.tsx';
import UpdateEmailVerificationPage from '../Pages/UpdateEmailVerificationPage.tsx';
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/update-email-verification" element={<ProtectedRoute><UpdateEmailVerificationPage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Expense /></ProtectedRoute>} />
          <Route path="/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
        <Toaster />
    </div>
  )
}