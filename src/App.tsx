import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterUserPage"
import EventPage from "./pages/EventPage"
import EditUser from "./pages/EditUserPage"
import LogInPage from "./pages/LogInPage"
import { useState } from "react"
import { AuthContext } from "./AuthContext"

export default function App() {
  const [user, setUser] = useState("");
  const BASE_URL = import.meta.env.VITE_API_URL;

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, setUser, BASE_URL }}>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LogInPage/>}/>
          <Route path="/events" element={<EventPage />} />
          <Route path="/profile" element={<EditUser />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}


