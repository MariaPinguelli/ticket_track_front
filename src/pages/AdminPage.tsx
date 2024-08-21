import Navbar from "../components/Navbar"
import styled from "styled-components";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import { useContext, useEffect, useState } from "react";
import EventIcon from '@mui/icons-material/Event';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { AuthContext } from "../AuthContext";
import ListUsers from "../components/ListUsers";
import ListEvents from "../components/ListEvents";


export default function AdminPage() {
  const [open, setOpen] = useState(true);
  const [openEvent, setOpenEvent] = useState(true);
  const [openUsers, setOpenUsers] = useState(false);
  const { evento, setEvento, BASE_URL } = useContext(AuthContext);
  const handleNestedList = () => {
    setOpen(!open);
  };
  
  function handleClicks(e:any) {
    switch (e) {
      case "edit-evento":
        setOpenEvent(true);
        setOpenUsers(false);
        break;
        case "users":
        setOpenUsers(true);
        setOpenEvent(false)
        break;
    }
  }

async function handleDeleteEvents(e:any) {
  const id = parseInt(e[0]);
  return await axios.delete(`${BASE_URL}/events/${id}`).
    then(res => { console.log(res.data) }).
    catch(err => console.log(err.response.data));

}
  
  useEffect(() => {
   
      const response = axios.get(`${import.meta.env.VITE_API_URL}/events`);
      response.then(res => {
        const novo = res.data;
        setEvento(novo);
      }).
        catch(err => {
          console.log(err.response.data);
        });
    
  }, []);

  return (
    <Container>
      <Navbar />
      <SidebarAdmin>
        <List sx={{bgcolor:"#DBDBDB", height:"300px"}}>
          <ListItemButton id="users" key={"edit-perfil"} onClick={event => handleClicks(event.currentTarget.id)}>
            <ListItemIcon sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"10px"}}>
              <PersonIcon sx={{ color: "#564256"}}></PersonIcon>
              <ListItemText primary="USUÁRIOS" sx={{color:"#564256", fontWeight:"bold"}}></ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={handleNestedList}>
            <ListItemIcon sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"10px"}}>
              <EventIcon sx={{ color: "#564256"}}></EventIcon>
              <ListItemText primary="EVENTOS" sx={{color:"#564256", fontWeight:"bold"}}></ListItemText>
            </ListItemIcon>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>  
          <Divider/>
          <Collapse  in={open} timeout="auto" unmountOnExit>
            <Divider />
            <ListItemButton sx={{pl:4}} id="criar-evento" key={"criar-evento"} onClick={event => handleClicks(event.currentTarget.id)}>
              <ListItemIcon sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"10px"}}>
                <AddIcon sx={{ color: "#564256"}}></AddIcon>
                <ListItemText primary="CRIAR EVENTO" sx={{color:"#564256", fontWeight:"bold"}}></ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <Divider/>
            <ListItemButton sx={{pl:4}} id="edit-evento" key={"edit-evento"} onClick={event => handleClicks(event.currentTarget.id)}>
              <ListItemIcon sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"10px"}}>
                <EditIcon sx={{ color: "#564256"}}></EditIcon>
                <ListItemText primary="EDITAR EVENTO" sx={{color:"#564256", fontWeight:"bold"}}></ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <Divider/>  
          </Collapse>
          <Divider />
        </List>
      </SidebarAdmin>
      {openUsers ?
        <ListUsers /> :
        <ListEvents/>
      }

    </Container>
) 

}


const SidebarAdmin = styled.div`
display: flex;
flex-direction: column;
height: 90vh;
max-width:  300px;
background-color: #DBDBDB;
bottom: 0;
left: 0;
position: fixed;
`
const Container = styled.div`
  display: flex;
  background-color: #F5F5F5;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`
