import { useState } from 'react'
import {useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import LogoImage from '../assets/ticket-logo.png';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';




export default function LogInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleRegister(e: { preventDefault: () => void; }) {
    e.preventDefault();
    if (password.length < 6) {
      alert('Senha inválida!');
      return
    }

    return axios.post(`${import.meta.env.VITE_API_URL}/users`, {name,email,password})
      .then(res => {
        console.log(res.data);
        navigate('/events')
        
      })
      .catch(e => console.log(e.reponse.data));
  }

  return (
    <Container>
      <Logo src={LogoImage}></Logo>
      <Typography sx={{ fontSize: 22, fontWeight: 'bold', color:'#384E77', fontFamily:"Roboto" }}>Login</Typography>
      <Box
        component={"form"}
        sx={{
          display: "flex", flexDirection: "column", height: "270px", justifyContent: "space-between",
          alignItems:"center", width:"350px"
        }}
        onSubmit={handleRegister}>
        <TextField
          id='email'
          label='Email'
          type='email'
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          id='password'
          label='Senha'
          type='password'
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button variant="contained" type='submit'>Entrar</Button>
        
          <Typography>Não tem cadastro?<Link href="/register"> Cadastre-se</Link></Typography>
        
      </Box>

    </Container>
  )
}


const Container = styled.div`
display: flex;
height: 100vh;
width: 100%;
justify-content: center;
align-items: center;
flex-direction: column;
  a{
    text-decoration: none;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: black;
  }
`
const Logo = styled.img`
height: 150px;
width: 160  px;
`
