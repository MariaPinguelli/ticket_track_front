import { useState } from "react";
import styled from "styled-components";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import axios from "axios";


export default function EditComponent(props:any) {
  const {nameEdit, emailEdit, passwordEdit, setNameEdit, setEmailEdit, setPasswordEdit} = props;


  async function handleUpdate(e: { preventDefault: () => void; }) {
    e.preventDefault();
    return await axios.put(`http://localhost:3000/users/9`, { name:nameEdit, email:emailEdit, password:passwordEdit }).
      then(res => {
        console.log("response back", res.data);
      
      }).
      catch(err => console.log(err.response.data));
  }

  async function handleClick() {
    return await axios.delete(`http://localhost:3000/users/2`).
      then(res => console.log('res', res.data)).
      catch(err => console.log('erro'))
  }

  return (
  <>
    <ProfileContainer>
        <Box component={'form'} onSubmit={handleUpdate}
          sx={{
            display: "flex", flexDirection: "column", height: "300px", justifyContent: "space-between",
            alignItems:"center", width:"350px"
          }}>
          <Typography  sx={{color:"#96939B", fontSize:"20px", marginBottom:"10px"}}>Edite seu perfil:</Typography>
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
      </ProfileContainer>
      <ContainerDelete>
        <Typography sx={{color:"#96939B", fontSize:"20px"}}>Deseja excluir sua conta?</Typography>
        <Button variant="contained" onClick={handleClick} sx={{marginTop:"20px"}}>Excluir Conta</Button>
      </ContainerDelete>
  </>  
  )
}


const ProfileContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100vh;
`

const ContainerDelete = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
height: 400px;
width: 100%;
align-items: center;
border-top: 1px solid #BFBFBF;
`