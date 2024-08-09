import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components'
import LogoImage from '../assets/ticket-logo.png';
import { LiaUserCircleSolid } from "react-icons/lia";
import axios from 'axios';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();

  function handleRegister(e: { preventDefault: () => void; }) {
    e.preventDefault();
    if (password.length < 6 || password !== confirm) {
      alert('Senha inválida!');
      return
    }

    return axios.post(`http://localhost:3000/users`, {name,email,password})
      .then(res => {
        console.log(res.data);
        navigate('/events')
        
      })
      .catch(e => console.log(e.reponse.data));
  }

  return (
    <Container>
      <Link to={'/edit'} >
        <LiaUserCircleSolid size={60}/>
      </Link>
      <Logo src={LogoImage}></Logo>
      <Form onSubmit={handleRegister}>
        <input
          placeholder='Nome'
          type='text'
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder='Email'
          type='email'
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder='Senha'
          type='password'
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          placeholder='Confirme a senha'
          type='password'
          required
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
        />
        <button type='submit'>Cadrastrar</button>
      </Form>

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
const Form = styled.form`
display: flex;
flex-direction: column;
gap: 10px;

  input{
    border-radius: 7px;
    border: 1px solid #D5D7CC;
    height: 25px;
    width: 200px;
  }

  button{
    border-radius: 8px;
    background-color: #7ab19c;
    color: #2F2F2F;
    font-size: 15px;
    font-weight: 700;
    border: 1px solid #D5D7CC;
    height: 30px;
    width: 200px;
  }
`