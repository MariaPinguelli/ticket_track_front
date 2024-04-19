import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import EventPage from "./pages/EventPage"

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/events" element={<EventPage/>} />
      </Routes>
    </BrowserRouter>
  )
}


