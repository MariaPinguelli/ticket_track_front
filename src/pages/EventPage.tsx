import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";



export default function EventPage() {
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  console.log('event', event);
  useEffect(() => {
        // Faz a solicitação GET para a URL desejada
    const response = axios.get('http://localhost:3000/events');
    response.then(res => {
      const novo = res.data;
      console.log(res);
      setEvent(novo);
      console.log(novo);
      //setLoading(false);
    }).
      catch(err => {
        console.log(err.response.data);
        setError(error);
        setLoading(false);

      });
  
  }, []);
  return (
    <EventContainer>
      {event.length === 0 ? <div><p>Não há nenhum evento registrado</p></div> :
      event.map((event) => <div> Oi</div>)}

    </EventContainer>
  )
}

const EventContainer = styled.div`
  background-color: aqua;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;


`
