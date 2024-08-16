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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { IconButton } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { AuthContext } from "../AuthContext";


export default function AdminPage() {
  const [open, setOpen] = useState(true);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [openEvent, setOpenEvent] = useState(true);
  const [openUsers, setOpenUsers] = useState(false);
  const { evento, setEvento } = useContext(AuthContext);
  const handleNestedList = () => {
    setOpen(!open);
  };

  console.log(evento);
  interface Users {
    id: number,
    name: string,
    email:string
  }
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

  console.log(allUsers);
  useEffect(() => {
    const users = axios.get(`${import.meta.env.VITE_API_URL}/users`);
    users.then(res => {
      const novo = res.data;
      setAllUsers(novo);
    }).
      catch(err => {
        console.log(err.response.data);
      });
    
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
      {openUsers ? <TableContainer sx={{ maxWidth: "500px", marginTop: "100px", fontFamily: "Roboto", color: "GrayText" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Nome</TableCell>
              <TableCell align="left">E-mail</TableCell>
              <TableCell align="left">Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map((u: Users) => (
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{u.id}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <IconButton>
                  <DeleteOutline />
                </IconButton>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> :
        

      <TableContainer sx={{ maxWidth: "700px", marginTop: "100px", fontFamily: "Roboto", color: "GrayText" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Nome</TableCell>
              <TableCell align="left">Descrição</TableCell>
              <TableCell align="left">Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{display:"-webkit-box", }}>
            {evento.map((e) => (
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{e.id}</TableCell>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.description}</TableCell>
                <TableCell>{e.date}</TableCell>
                <IconButton>
                  <DeleteOutline />
                </IconButton>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
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
