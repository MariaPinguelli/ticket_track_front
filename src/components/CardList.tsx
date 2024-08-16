import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';


export default function CardList(props: any) {
  const { favorite, setFavorite } = useContext(AuthContext);
  
  const { id, description, name, evento} = props;

  function handleFavorites(e: any) {
    //console.log("card", e);
    console.log("favorites", favorite);
    if (favorite.some(fav => fav.id === e)) {
      const novo = favorite.filter((f: any) => f != e);
      setFavorite(novo);
    } else {
      setFavorite([...favorite, evento]);
    }
  }
  return (
    <>

      <Card key={id} sx={{ height: 300, width: 280, bgcolor:'white', display:'flex'}}>
        <CardContent sx={{ display:"flex", flexDirection: 'column', justifyContent: "space-between" }}>
            <TypographyContainer>
              <Typography sx={{fontSize: 18, fontWeight:'bold', fontFamily:"Roboto, sans serif"}} color={'GrayText'}>{name}</Typography>
              <Typography sx={{ fontSize: 16, color: '#590925', fontWeight: "400"}}>{description}</Typography>
            </TypographyContainer>
             <IconButton aria-label={id} sx={{width:"40px"}} onClick={e => handleFavorites(e.currentTarget.ariaLabel)}>
            <BookmarkIcon sx={{ display: "flex", left: "0", bottom: "0", alignItems: "flex-end" }} />
            </IconButton>  
          </CardContent>
      </Card>
    
    </>
  )
}

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