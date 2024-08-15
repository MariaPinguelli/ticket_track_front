import styled from "styled-components";
import axios from "axios";
import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import EditComponent from "../components/EditComponent";
import Sidebar from "../components/Sidebar";
import FavoritePage from "./FavoriteCardsPage";
import { AuthContext } from "../AuthContext";


export default function EditUser() {
  const [nameEdit, setNameEdit] = useState(''); 
  const [emailEdit, setEmailEdit] = useState('');
  const [passwordEdit, setPasswordEdit] = useState('');
  const [open, setOpen] = useState(true);

  async function getUsersTest() {
    return await axios.get('http://localhost:3000/users').
      then(res => console.log(res.data)).
      catch(err => console.log(err.response.data));

  }

  getUsersTest();
  return (
    <Container>
      <Navbar />
      <Sidebar
        open={open}
        setOpen={setOpen} />     
      {/* <EditComponent
        nameEdit={nameEdit}
        setNameEdit={setNameEdit}
        emailEdit={emailEdit}
        setEmailEdit={setEmailEdit}
        passwordEdit={passwordEdit}
        setPasswordEdit={setPasswordEdit}/> */}
      <FavoritePage/>
    </Container>
  )
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #F5F5F5;
  overflow-y: scroll;
  
`
