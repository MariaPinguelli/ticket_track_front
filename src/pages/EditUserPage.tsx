import styled from "styled-components";
import axios from "axios";

export default function EditUser() {

async function handleClick() {
    return await axios.delete(`http://localhost:3000/users/1`).
      then(res => console.log('res', res.data)).
      catch(err => console.log('erro'))
  }

  async function getUsersTest() {
    return await axios.get('http://localhost:3000/users').
      then(res => console.log(res.data)).
      catch(err => console.log('erro'));

  }

  getUsersTest();
  return (
    <Container>
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