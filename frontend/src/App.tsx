import { Route, Routes } from "react-router-dom";
import LandingPage from "../Pages/LandingPage.tsx"
import SignUpPage from "../Pages/SignUpPage.tsx";
import VerifyEmailPage from '../Pages/VerifyEmailPage.tsx'
import LoginPage from "../Pages/LoginPage.tsx";
import ForgetPasswordPage from "../Pages/ForgetPasswordPage.tsx"
import ResetPasswordPage from "../Pages/ResetPasswordPage.tsx"
import Dashboard from '../Pages/Dashboard.tsx'
import Expense from '../Pages/Transaction.tsx';
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Expense />} />
      </Routes>
      <Toaster />
    </div>
  )
}