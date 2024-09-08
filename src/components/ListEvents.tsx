import styled from "styled-components";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { AuthContext } from "../AuthContext";
import { useState, useContext } from "react";
import Button from '@mui/material/Button';
import Events from "../model/Events";
import axios from "axios";
import 'dayjs/locale/pt-br'
import dayjs from "dayjs";
export default function ListEvents() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [id, setId] = useState(undefined);
  const { evento, BASE_URL } = useContext(AuthContext);
  dayjs.locale('pt-br');
 
  function handleDialog(e:any) {
    if (dialogOpen === false) {
      setDialogOpen(true);
      const id = e;
      setId(id);
    } else {
      setDialogOpen(false);
      if (e === "sim") {
        handleDeleteEvents(id);
      }
    }
  }

  async function handleDeleteEvents(e:any) {
    const id = parseInt(e);
    return await axios.delete(`${BASE_URL}/events/${id}`).
      then(res => { console.log(res.data) }).
      catch(err => console.log(err.response.data));
  
  }

  return(
    <Container>
      <TableContainer sx={{ maxWidth: "700px", marginTop: "100px", fontFamily: "Roboto", color: "GrayText" }} component={Paper}>
        <Table>
          <TableHead sx={{bgcolor:"#B26262"}}>
            <TableRow sx={{display:"flex", justifyContent:"space-between"}}>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Data</TableCell>
              <TableCell align="center">Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{display:"-webkit-box" }}>
            {evento.map((e: Events) => (
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{e.id}</TableCell>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.description}</TableCell>
                <TableCell>{dayjs(e.date).locale("pt-br").format("DD/MM/YYYY HH:mm")}</TableCell>
                <IconButton  component="button" key={e.id} id={e.id === null? e.id : e.id.toString()} onClick={(e) => handleDialog(e.currentTarget.id)}>
                  <DeleteOutline />
                </IconButton>
                <Dialog 
                  open={dialogOpen}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Deseja deletar o evento?"}</DialogTitle>
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