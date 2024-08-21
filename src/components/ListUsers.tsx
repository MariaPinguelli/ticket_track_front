import styled from "styled-components"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import Users from "../model/Users.tsx";


export default function ListUsers() {
  const { BASE_URL } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [id, setId] = useState(undefined);

 

  function handleDialog(e:any) {
    if (dialogOpen === false) {
      setDialogOpen(true);
      const id = e;
      setId(id);
    } else {
      setDialogOpen(false);
      if (e === "sim") {
        handleDeleteUsers(id);
      }
    }
  }

 
  async function handleDeleteUsers(e:any) {
    const id = parseInt(e);
    return await axios.delete(`${BASE_URL}/users/${id}`).
      then(res => { console.log(res.data) }).
      catch(err => console.log(err.response.data));
  }  

  useEffect(() => {
    const users = axios.get(`${BASE_URL}/users`);
    users.then(res => {
      const novo = res.data;
      setAllUsers(novo);
    }).
      catch(err => {
        console.log(err.response.data);
      });
  }, []);

  return(
    <Container>
      <TableContainer sx={{ maxWidth: "500px", marginTop: "100px", fontFamily: "Roboto", color: "GrayText" }} component={Paper}>
        <Table>
          <TableHead sx={{bgcolor:"#B26262"}}>
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
                <IconButton component="button" key={u.id} id={u.id.toString()} onClick={(e) => handleDialog(e.currentTarget.id.toString())}>
                  <DeleteOutline/>
                </IconButton>
                <Dialog
                  open={dialogOpen}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Deseja deletar o usuário?"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">A ação de exclusão não poderá ser desfeita!</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button id={"nao"} onClick={(e) => handleDialog (e.currentTarget.id)}>Não</Button>
                    <Button id={"sim"} onClick={(e) => handleDialog(e.currentTarget.id)}>Sim</Button>
                  </DialogActions>
                </Dialog>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}



const Container = styled.div`
  display: flex;
  background-color: #F5F5F5;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`
