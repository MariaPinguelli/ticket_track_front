import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Navbar from "../components/Navbar";
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import AddIcon from '@mui/icons-material/Add';



export default function EditUser() {
  const [nameEdit, setNameEdit] = useState('');
  const [emailEdit, setEmailEdit] = useState('');
  const [passwordEdit, setPasswordEdit] = useState('');
  const [open, setOpen] = useState(true);

const handleNestedList = () => {
    setOpen(!open);
};


async function handleClick() {
    return await axios.delete(`http://localhost:3000/users/2`).
      then(res => console.log('res', res.data)).
      catch(err => console.log('erro'))
  }
async function handleUpdate(e:any) {
  e.preventDefault();
  return await axios.put(`hhttp://localhost:3000/users/2`, { nameEdit, emailEdit, passwordEdit }).
    then(res => {
      console.log(res.data);
      console.log("Usuário editado");
    }).
    catch(err => console.log(err.response));
}


  async function getUsersTest() {
    return await axios.get('http://localhost:3000/users').
      then(res => console.log(res.data)).
      catch(err => console.log('erro'));

  }

  getUsersTest();
  return (
    <Container>
      <Navbar />
      <SideBar>
        <List sx={{bgcolor:"#DBDBDB", height:"300px"}}>
          <ListItemButton>
            <ListItemIcon sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"10px"}}>
              <EditIcon sx={{ color: "#564256"}}></EditIcon>
              <ListItemText primary="EDITAR PERFIL" sx={{color:"#564256", fontWeight:"bold"}}></ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={handleNestedList}>
            <ListItemIcon sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"10px"}}>
              <EventIcon sx={{ color: "#564256"}}></EventIcon>
              <ListItemText primary="MEUS EVENTOS" sx={{color:"#564256", fontWeight:"bold"}}></ListItemText>
            </ListItemIcon>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>  
          <Divider/>
          <Collapse  in={open} timeout="auto" unmountOnExit>
            <ListItemButton sx={{pl:4}}>
              <ListItemIcon sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"10px"}}>
                <BookmarkIcon sx={{ color: "#564256"}}></BookmarkIcon>
                <ListItemText primary="FAVORITOS" sx={{color:"#564256", fontWeight:"bold"}}></ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <Divider />
            <ListItemButton sx={{pl:4}}>
              <ListItemIcon sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"10px"}}>
                <AddIcon sx={{ color: "#564256"}}></AddIcon>
                <ListItemText primary="CRIAR EVENTO" sx={{color:"#564256", fontWeight:"bold"}}></ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <Divider/>
            <ListItemButton sx={{pl:4}}>
              <ListItemIcon sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"10px"}}>
                <EditIcon sx={{ color: "#564256"}}></EditIcon>
                <ListItemText primary="EDITAR EVENTO" sx={{color:"#564256", fontWeight:"bold"}}></ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <Divider/>  
          </Collapse>
          <ListItemButton>
            <ListItemIcon sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"10px"}}>
              <DeleteIcon sx={{ color: "#564256"}}></DeleteIcon>
              <ListItemText primary="EXCLUIR CONTA" sx={{color:"#564256", fontWeight:"bold"}}></ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <Divider />
        </List>
      </SideBar>
      <ProfileContainer>
      <Box component={'form'}
        sx={{
          display: "flex", flexDirection: "column", height: "300px", justifyContent: "space-between",
          alignItems:"center", width:"350px"
        }}

        onSubmit={handleUpdate}>
      
        <TextField
          id="name"
          label='Nome'
          type='text'
          required
          value={nameEdit}
          onChange={e => setNameEdit(e.target.value)}
        />
        <TextField
          id="email"
          label='Email'
          type='email'
          required
          value={emailEdit}
          onChange={e => setEmailEdit(e.target.value)}
        />
        <TextField
          id="password"
          label='Senha'
          type='password'
          required
          value={passwordEdit}
          onChange={e => setPasswordEdit(e.target.value)}
        />
        <Button variant="contained" type='submit'>Salvar edição</Button>
      
        </Box>
        
        <Button variant="contained" onClick={handleClick}>Excluir Conta</Button>
        </ProfileContainer>
    </Container>
  )
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #F5F5F5;
`

const SideBar = styled.div`
display: flex;
flex-direction: column;
height: 90vh;
width:  300px;
background-color: #DBDBDB;
bottom: 0;
left: 0;
position: fixed;
`

const ProfileContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100vh;
background-color: #F5F5F5;
`