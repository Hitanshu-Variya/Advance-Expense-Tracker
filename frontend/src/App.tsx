import { Route, Routes } from "react-router-dom";
import SignUpPage from "../Pages/SignUpPage.tsx";
import LoginPage from "../Pages/LoginPage.tsx";
import ForgetPasswordPage from "../Pages/ForgetPasswordPage.tsx"

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
      </Routes>
    </div>
  )
}