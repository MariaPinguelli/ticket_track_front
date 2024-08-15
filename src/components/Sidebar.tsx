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
import AddIcon from '@mui/icons-material/Add';
import BookmarkIcon from '@mui/icons-material/Bookmark';


export default function Sidebar(props:any) {
  const { open, setOpen } = props;

  const handleNestedList = () => {
    setOpen(!open);
};
  return (
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