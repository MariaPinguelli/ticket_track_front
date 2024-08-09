import styled from "styled-components";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";



export default function Navbar() {
  return (
    <Header>
      <Stack display={'flex'} justifyContent={'center'} alignItems={"center"}>
        <Link to={"/edit"}>
          <IconButton sx={{ color: "#384E77", marginLeft: "80" }}>
            <PersonIcon fontSize="large" ></PersonIcon>
          </IconButton>
        </Link>
      </Stack>
   </Header>
 )

}


const Header = styled.div`
  display: flex;
  background-color: white;
  left: 0;
  top: 0;
  position: fixed;
  z-index: 1;
  justify-content: space-between;
  height: 80px;
  width: 100%;
  border-bottom: 1px solid #e7e7e7;

`
