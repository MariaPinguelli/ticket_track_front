import styled from "styled-components";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    navigate("/profile");

  };


  return (
    <Header>
      <Stack display={'flex'} justifyContent={'center'} alignItems={"center"}>
        <IconButton
          sx={{ color: "#384E77", marginLeft: "80" }}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}>
          <PersonIcon fontSize="large" ></PersonIcon>
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
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
