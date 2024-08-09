import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Navbar from "../components/Navbar";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



export default function EventPage() {
  const [event, setEvent] = useState([{id:null, name:null, description:null}]);

  console.log('event', event);
  useEffect(() => {
    const response = axios.get('http://localhost:3000/events');
    response.then(res => {
      const novo = res.data;
      setEvent(novo);
    }).
      catch(err => {
        console.log(err.response.data);
      });
  
  }, []);



  async function getEvents() {
    return await axios.get('http://localhost:3000/events').
      then(res => console.log('getevents', res.data)).
      catch(err => console.log(err));
  }

getEvents();
console.log("evento novo", event);

  return (
  <Container>
   <Navbar></Navbar>
    <EventContainer>
      {event.length === 0 ? <Box display={'flex'}><CircularProgress/></Box> :
        event.map(event =>
          <Card key={event.id} sx={{ height: 300, width: 280, bgcolor:'white', display:'flex' }}>
            <CardContent sx={{display:'flex', flexDirection:'column'}}>
              <Typography sx={{fontSize: 18, fontWeight:'bold', fontFamily:"Roboto, sans serif"}} color={'GrayText'}>{event.name}</Typography>
              <Typography sx={{ fontSize: 16, color: '#590925', fontWeight: "400" }}>{event.description}</Typography>
            </CardContent>
          </Card>)}

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
  gap: 20px
`
