import styled from "styled-components";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuIcon from '@mui/icons-material/Menu';


export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [onProfile, setOnProfile] = useState(true);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOnProfile(true);
  };

  const handleBackClick = () => {
    navigate("/");
    setOnProfile(false);
  }

  function handleRoutes(e:any) {
    switch (e) {
      case "cadastro":
        navigate("/register");
        break;
      case "login":
        navigate("/login");
        break;
      case "profile":
        navigate("/profile");
        break;
      default:
        navigate("/events");
    }
    handleClose();

  } 


  return (
    <Header>
      <Stack display={'flex'} justifyContent={'space-between'} alignItems={"center"} width={'100%'} flexDirection={'row'}>
        {onProfile ? <IconButton sx={{ color: "#384E77", marginLeft: "80" }}
          onClick={handleBackClick}>
          <ArrowBackIosNewIcon/>
        </IconButton> : null}
        <IconButton
          sx={{ color: "#384E77", marginLeft: "80" }}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}>
          <MenuIcon/>
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
          'aria-labelledby': 'basic-button',
          }}>
          <MenuItem id="cadastro" onClick={e => handleRoutes(e.currentTarget.id)}>Cadastre-se</MenuItem>
          <MenuItem id="login" onClick={e=> handleRoutes(e.currentTarget.id)}>Login</MenuItem>
          <MenuItem id="profile" onClick={e=> handleRoutes(e.currentTarget.id)}>Minha Conta</MenuItem>
          <MenuItem id="logout" onClick={e=> handleRoutes(e.currentTarget.id)}>Logout</MenuItem>
        </Menu>
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
