'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TextField, Button, Typography, Box, Grid, Card, CardContent, CardMedia, Alert } from '@mui/material';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  available: boolean;
}
export default function page() {
  const searchParams = useSearchParams();
  const bookData = JSON.parse(searchParams.get('book') || '{}') as Book;
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [fechaInicio, setFechaInicio] = useState(new Date().toISOString().slice(0, 10)); // Fecha actual
  const [fechaFin, setFechaFin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!nombre.trim() || !email.trim() || !fechaInicio || !fechaFin) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('El correo electrónico no es válido.');
      return;
    }

    if (new Date(fechaFin) <= new Date(fechaInicio)) {
      setError('La fecha de fin debe ser posterior a la fecha de inicio.');
      return;
    }

    console.log('Solicitud de préstamo:', {
      libro: bookData,
      nombre,
      email,
      fechaInicio,
      fechaFin,
    });
  };

    function isValidEmail(email: string) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

  return (
    <Box sx={{ padding: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {/* Tarjeta del libro */}
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={`/images/${bookData.coverImage}`}
              alt={bookData.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {bookData.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {bookData.author}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
              Solicitar Préstamo
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                margin="normal"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <TextField
                label="Correo Electrónico"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
              <TextField
                label="Fecha de Inicio"
                variant="outlined"
                fullWidth
                margin="normal"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                type="date"
                required
              />
              <TextField
                label="Fecha de Fin"
                variant="outlined"
                fullWidth
                margin="normal"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                type="date"
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Enviar Solicitud
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}