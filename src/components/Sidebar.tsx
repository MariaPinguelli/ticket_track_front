import styled from "styled-components";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";

export default function Sidebar(props:any) {
  const { open, setOpen } = props;
  const { openFav, setOpenEdtP, setOpenFav, openEdtP } = useContext(AuthContext);

  const handleNestedList = () => {
    setOpen(!open);
  };
  
  function handleClicks(e:any) {
    switch (e) {
      case "edit-perfil":
        setOpenEdtP(true);
        setOpenFav(false);
        break;
        case "favoritos":
        setOpenFav(true);
        setOpenEdtP(false)
        break;
    }

  }

  return (
      <SideBar>
        <List sx={{bgcolor:"#DBDBDB", height:"300px"}}>
          <ListItemButton id="edit-perfil" key={"edit-perfil"} onClick={event => handleClicks(event.currentTarget.id)}>
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
            <ListItemButton sx={{pl:4}} id="favoritos" key={"favoritos"} onClick={event => handleClicks(event.currentTarget.id)}>
              <ListItemIcon sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"10px"}}>
                <BookmarkIcon sx={{ color: "#564256"}}></BookmarkIcon>
                <ListItemText primary="FAVORITOS" sx={{color:"#564256", fontWeight:"bold"}}></ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <Divider/>
          </Collapse>
          <Divider />
        </List>
      </SideBar>


  );
}

const SideBar = styled.div`
display: flex;
flex-direction: column;
height: 90vh;
max-width:  300px;
background-color: #DBDBDB;
bottom: 0;
left: 0;
position: fixed;
`