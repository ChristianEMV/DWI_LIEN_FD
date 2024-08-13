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
  Snackbar,
} from "@mui/material";
import logo from "../../assets/imgs/LIEN.png";
import Image from "next/image";
import imagenFondo from "../../../public/fondo.jpg";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // Estado para el mensaje de éxito
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Estado para manejar la visibilidad del Snackbar
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    setSnackbarOpen(false); // Cerrar el Snackbar en caso de un nuevo envío

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
    
    // Simular un registro exitoso
    setSuccess(true);
    setSnackbarOpen(true);

    // Redirigir después de que el Snackbar se haya mostrado
    setTimeout(() => {
      router.push("/login");
    }, 6000); // Tiempo igual al autoHideDuration del Snackbar
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    router.push("/login"); // Redirigir también si el usuario cierra el Snackbar manualmente
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${imagenFondo.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card
            sx={{
              padding: 3,
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fondo blanco semitransparente
            }}
          >
            <CardContent>
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Image src={logo} alt="Logo de LIEN" width={120} height={120} style={{ objectFit: "contain" }} />
                <Typography
                  variant="h5"
                  component="h2"
                  color="#13a984"
                  fontWeight="bold"
                  align="center"
                  sx={{ mt: 2 }}
                >
                  Registro
                </Typography>
              </Box>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                action={
                  <Button color="inherit" onClick={handleSnackbarClose}>
                    Cerrar
                  </Button>
                }
              >
                <Alert
                  onClose={handleSnackbarClose}
                  severity="success"
                  sx={{ width: '100%' }}
                >
                  Registro exitoso. Al iniciar sesión, deberás actualizar tu contraseña de acuerdo con las políticas de la universidad.
                </Alert>
              </Snackbar>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Nombre de Usuario"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{
                    mb: 2,
                    "& .MuiInputLabel-root": {
                      color: "text.primary",
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#13a984",
                    },
                  }}
                />
                <TextField
                  label="Correo Electrónico"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    mb: 2,
                    "& .MuiInputLabel-root": {
                      color: "text.primary",
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#13a984",
                    },
                  }}
                />
                <TextField
                  label="Contraseña"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    mb: 2,
                    "& .MuiInputLabel-root": {
                      color: "text.primary",
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#13a984",
                    },
                  }}
                />
                <TextField
                  label="Confirmar Contraseña"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{
                    mb: 2,
                    "& .MuiInputLabel-root": {
                      color: "text.primary",
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#13a984",
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontSize: "16px",
                    borderRadius: 1,
                  }}
                >
                  Registrarse
                </Button>
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <Link href="/login">
                    <Typography variant="body2" color="primary">
                      ¿Ya tienes una cuenta? Inicia sesión aquí
                    </Typography>
                  </Link>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Page;
