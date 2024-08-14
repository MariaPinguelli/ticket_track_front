import styled from "styled-components";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from "react-router-dom";
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
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    navigate("/profile");
    setOnProfile(true);
  };

  const handleBackClick = () => {
    navigate("/events");
    setOnProfile(false);
  }


  return (
    <Header>
      <Stack display={'flex'} justifyContent={'space-between'} alignItems={"center"} width={'100%'} flexDirection={'row'}>
        {onProfile ? <IconButton sx={{ color: "#384E77", marginLeft: "80" }}
          onClick={handleBackClick}>
          <ArrowBackIosNewIcon />
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
          <MenuItem onClick={handleClose}>Cadastre-se</MenuItem>
          <MenuItem onClick={handleClose}>Entrar</MenuItem>
          <MenuItem onClick={handleClose}>Minha Conta</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
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
