import { Route, Routes } from "react-router-dom";
import SignUpPage from "../Pages/SignUpPage.tsx";
import LoginPage from "../Pages/LoginPage.tsx";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  )
}