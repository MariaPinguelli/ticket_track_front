import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterUserPage"
import EventPage from "./pages/EventPage"
import EditUser from "./pages/EditUserPage"

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/edit" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  )
}


