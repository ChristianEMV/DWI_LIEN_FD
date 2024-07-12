"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  Grid,
} from "@mui/material";
import logo from "../../assets/imgs/LIEN.png";
import Image from "next/image";
import imagenFondo from "../../../public/fondo.jpg";
import Link from "next/link";

function page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    alert("Registro exitoso (simulado)");
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${imagenFondo.src})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box>
                  <Typography
                    variant="h5"
                    component="h2"
                    color="#13a984"
                    fontStyle="bold"
                    align="center"
                  >
                    Registro
                  </Typography>
                  {error && <Alert severity="error">{error}</Alert>}
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Nombre de Usuario"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                      label="Correo Electrónico"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                    <TextField
                      label="Confirmar Contraseña"
                      type="password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="small"
                    >
                      Registrarse
                    </Button>
                  </form>
                  <Link href="/login">
                    <Typography variant="body2" color="primary" textAlign="center">
                      ¿Ya tienes una cuenta? Inicia sesión aquí
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default page;
