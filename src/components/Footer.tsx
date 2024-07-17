import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" sx={{ 
      bgcolor: 'primary.main', 
      color: 'white', 
      py: 3, 
      width: '100%',
    }}>
      <Grid container spacing={3} sx={{ 
        maxWidth: 'lg',
        margin: '0 auto'
      }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            LIEN
          </Typography>
          <Typography variant="body2">
          Librería Interactiva y Electrónica, tu plataforma para conectar con el conocimiento.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Enlaces
          </Typography>
          <Link href="/home" color="inherit">
            Inicio
          </Link>
          <br />
          <Link href="" color="inherit">
            Acerca de
          </Link>
          <br />
          <Link href="" color="inherit">
            Contacto
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Contacto
          </Typography>
          <Typography variant="body2">
            Correo: info@lien.com
          </Typography>
          <Typography variant="body2">
            Teléfono: 7771319651
          </Typography>
        </Grid>
      </Grid>
      <Box textAlign="center" pt={3}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} LIEN. Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
