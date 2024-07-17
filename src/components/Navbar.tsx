"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import Image from "next/image";
import Box from "@mui/material/Box";
import logo from "../assets/imgs/logo.png";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HomeIcon from '@mui/icons-material/Home';
import { Menu, MenuItem } from "@mui/material";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        margin: 0,
        marginBottom: "16px",
        backgroundColor: "#ffffff",
      }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          edge="start"
          color="primary"
          aria-label="menu"
          onClick={handleClick}
          sx={{ mr: 1 }}
        >
          <MenuIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <Link href="/profile" legacyBehavior>
            <MenuItem onClick={handleClose}>
              <AccountCircleIcon sx={{ mr: 1 }} />
              Perfil
            </MenuItem>
          </Link>
          <Link href="/home" legacyBehavior>
            <MenuItem onClick={handleClose}>
              <HomeIcon sx={{ mr: 1 }} />
              Inicio
            </MenuItem>
          </Link>
          <Link href="/library" legacyBehavior>
            <MenuItem onClick={handleClose}>
              <MenuBookIcon sx={{ mr: 1 }} />
              Biblioteca
            </MenuItem>
          </Link>
          <Link href="/users" legacyBehavior>
            <MenuItem onClick={handleClose}>
              <PeopleAltIcon sx={{ mr: 1 }} />
              Usuarios
            </MenuItem>
          </Link>
        </Menu>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" component="div" color="black">
            LIEN
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Link href="/home" legacyBehavior>
        <a>
        <Image
          src={logo}
          alt="Logo"
          style={{ height: "50px", marginRight: "450px", objectFit: "contain" }}
        />
        </a>
        </Link>
        <Link href="/login" legacyBehavior>
          <Button color="primary" startIcon={<LoginIcon />}>
            Iniciar sesión
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
