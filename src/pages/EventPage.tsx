import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import CardList from "../components/CardList";
import Navbar from "../components/Navbar";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { AuthContext } from "../AuthContext";




export default function EventPage() {
  //const [evento, setEvento] = useState([{ id: null, name: null, description: null }]);
  const { evento, setEvento } = useContext(AuthContext);

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
      <Box sx={{ marginTop: "400px", padding: "10px", marginLeft: "40px", maxWidth: "900px" }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 6, md: 12 }} > 
          { evento.length === 0 ? <Box display={'flex'}><CircularProgress/></Box> :
              evento && evento.map((evento: { id: any; description: any; name: any; }) =>
              <Grid item xs={1} sm={4} md={4}>  
                <CardList
                key={evento.id}
                description={evento.description}
                id={evento.id}
                name={evento.name}
                evento={evento}>
                </CardList>
              </Grid> )
         }
         </Grid>   
      </Box> 
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
