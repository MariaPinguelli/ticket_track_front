import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterUserPage"
import EventPage from "./pages/EventPage"
import EditUser from "./pages/EditUserPage"
import LogInPage from "./pages/LogInPage"
import { useState } from "react"
import { AuthContext } from "./AuthContext"
import AdminPage from "./pages/AdminPage"

export default function App() {
  const [user, setUser] = useState("");
  const [favorite, setFavorite] = useState<Event[]>([]);
  const [openEdtP, setOpenEdtP] = useState(true);
  const [openFav, setOpenFav] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [evento, setEvento] = useState([{ id: null, name: null, description: null }]);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{user, setUser, favorite, setFavorite, BASE_URL, setOpenFav, openFav, setOpenEdtP, openEdtP, evento, setEvento}}>
        <Routes>
          <Route path="/" element={<EventPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LogInPage/>}/>
          <Route path="/profile" element={<EditUser />} />
          <Route path="/admin" element={<AdminPage/> } /> 
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}


