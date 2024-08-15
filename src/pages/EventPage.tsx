import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import CardList from "../components/CardList";
import Navbar from "../components/Navbar";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";




export default function EventPage() {
  const [evento, setEvento] = useState([{ id: null, name: null, description: null }]);

  useEffect(() => {
    const response = axios.get(`${import.meta.env.VITE_API_URL}/events`);
    response.then(res => {
      const novo = res.data;
      setEvento(novo);
    }).
      catch(err => {
        console.log(err.response.data);
      });
  
  }, []);

 
  
  async function getEvents() {
    return await axios.get(`${import.meta.env.VITE_API_URL}/events`).
      then(res => console.log('getevents', res.data)).
      catch(err => console.log(err));
  }

getEvents();


  return (
  <Container>
   <Navbar></Navbar>
    <EventContainer>
      { evento.length === 0 ? <Box display={'flex'}><CircularProgress/></Box> :
          evento && evento.map((evento: { id: any; description: any; name: any; })=>
            <CardList
            key={evento.id}
            description={evento.description}
            id={evento.id}
            name={evento.name}>
            </CardList>)
      }

    </EventContainer>
  </Container>
  )
}

const Container = styled.div`
  display: flex;
  background-color: #F5F5F5;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`
const EventContainer = styled.div`
  background-color: #F5F5F5;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  overflow-y: scroll;
  
`
