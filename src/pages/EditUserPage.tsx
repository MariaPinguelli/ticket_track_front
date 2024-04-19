import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

export default function EditUser() {
  const [nameEdit, setNameEdit] = useState('');
  const [emailEdit, setEmailEdit] = useState('');
  const [passwordEdit, setPasswordEdit] = useState('');


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
      <Form onSubmit={handleUpdate}>
        <input
          placeholder='Nome'
          type='text'
          required
          value={nameEdit}
          onChange={e => setNameEdit(e.target.value)}
        />
        <input
          placeholder='Email'
          type='email'
          required
          value={emailEdit}
          onChange={e => setEmailEdit(e.target.value)}
        />
        <input
          placeholder='Senha'
          type='password'
          required
          value={passwordEdit}
          onChange={e => setPasswordEdit(e.target.value)}
        />
        <button type='submit'>Salvar edição</button>
      </Form>
      
      <Deletar onClick={handleClick}>Excluir Conta</Deletar>
    </Container>
  )
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`

const Deletar = styled.button`
height  : 50px ;
width: 130px;
border-radius: 6px;
color: white;
font-size: 15px;
font-weight: 700;
background-color: #B26262;
border: 1px solid #D5D7CC;
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