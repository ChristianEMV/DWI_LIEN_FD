'use client'; 

import React from "react";
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
import Link from 'next/link';


function Navbar() {
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
          sx={{ mr: 1 }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" component="div" color="black">
            LIEN
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Image
          src={logo}
          alt="Logo"
          style={{ height: "50px", marginRight: "300px", objectFit: "contain" }}
        />
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
