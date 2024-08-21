import styled from "styled-components";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardList from "../components/CardList";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
//http:..../user/id/event

export default function FavoritePage() {
  const { favorite, setFavorite } = useContext(AuthContext);
  console.log('favoritos page', favorite);

  
  function handleFavorites(e:any) {
    console.log("card", e);
    console.log("favorites", favorite);
    if (favorite.includes(e)) {
      const novo = favorite.filter((f: any) => f != e);
      setFavorite(novo);
    } else {
      setFavorite([...favorite, e]);
    }
  }

  return (
<>  
  <Typography sx={{color:"GrayText", marginTop:"100px", fontWeight:"bold"}}>MEUS FAVORITOS</Typography>
    <Box sx={{  marginTop: "90px", padding:"10px", marginLeft:"40px", maxWidth:"900px" }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 6, md: 12 }} >
        {favorite.length == 0 ? <p>Você ainda não possui eventos favoritos</p> :
          favorite.map((f: any) =>
          <Grid item xs={1} sm={4} md={4}>  
            <Card key={f.id} sx={{ height: 300, width: 280, bgcolor:'white', display:'flex' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent:"space-between" }}>
                <TypographyContainer>
                  <Typography sx={{fontSize: 18, fontWeight:'bold', fontFamily:"Roboto, sans serif"}} color={'GrayText'}>{f.name}</Typography>
                  <Typography sx={{ fontSize: 16, color: '#590925', fontWeight: "400" }}>{f.description}</Typography>
                </TypographyContainer>
                <IconButton aria-label={f.id} sx={{width:"40px"}} onClick={e => handleFavorites(e.currentTarget.ariaLabel)}>
                  <BookmarkIcon sx={{ display: "flex", left: "0", bottom: "0", alignItems: "flex-end" }} />
                </IconButton>  
              </CardContent>
            </Card>
          </Grid>
        
      )
        }
      </Grid>
    </Box>
</> 

  );
}


const Container = styled.div`
width: 700px;
margin-top: 90px;
padding: 10px;
height: 90vh;
display: flex;
background-color: aqua;
justify-content: space-around;
flex-wrap: wrap ;
overflow-y: scroll;
`
const TypographyContainer = styled.div`
width: 100%;
height: min-content;
white-space: normal; /* Permite quebra de linha */
display: -webkit-box; /* Necessário para a limitação de linhas */
-webkit-line-clamp: 8; /* Número de linhas visíveis */
-webkit-box-orient: vertical; /* Orientação do box */
overflow: hidden; /* Oculta o texto que ultrapassa o espaço */
text-overflow: ellipsis; /* Adiciona os três pontinhos no final */


`