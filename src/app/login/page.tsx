"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Grid,
  Box,
} from "@mui/material";
import logo from "../../assets/imgs/LIEN.png";
import Image from "next/image";
import imagenFondo from "../../../public/fondo.jpg";
import Link from "next/link";

function page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (username.trim() === "") {
      setError("El nombre de usuario es obligatorio.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    alert("Inicio de sesión exitoso (simulado)");
  };

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        backgroundImage: `url(${imagenFondo.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Image src={logo} alt="Imagen de fondo" width={160} height={180} style={{objectFit: "contain" }} />
            <Box>
              <Typography
                variant="h5"
                component="h2"
                color="#13a984"
                fontStyle="bold"
                align="center"
              >
                Inicio de Sesión
              </Typography>
              {error && <Alert severity="error">{error}</Alert>}
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Correo Electronico"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  label="Contraseña"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="small"
                >
                  Iniciar Sesión
                </Button>
                <Link href="/register">
                  <Typography variant="body2" color="primary" textAlign="center">
                    ¿No tienes una cuenta? Regístrate aquí
                  </Typography>
                </Link>
              </form>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default page;
