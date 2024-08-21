import { useContext, useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import LogoImage from '../assets/ticket-logo.png';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { AuthContext } from '../AuthContext';



export default function LogInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser, BASE_URL } = useContext(AuthContext);

  useEffect(() => {
    const lsUser = JSON.parse(localStorage.getItem("user") as string);
    if (lsUser !== null) {
      setUser(lsUser);

    }
  }, []);

  function handleLogin(e: { preventDefault: () => void; }) {
    e.preventDefault();
    navigate('/profile');
    const body = { email, password };
    return axios.post(`${BASE_URL}/users`, body)
      .then(res => {
        console.log(res.data);
        const { name, email, token } = res.data;
        setUser({ name, email, token });
        localStorage.setItem("user", JSON.stringify({ name, email, token }));
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
        onSubmit={handleLogin}>
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
        
          <Typography>Não tem cadastro?<Link href="/profile"> Cadastre-se</Link></Typography>
        
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
