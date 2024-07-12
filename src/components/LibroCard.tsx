import React from 'react'
import { Box, Typography, Grid, Container, Button, CardContent, Card, CardMedia, CardActionArea } from '@mui/material';
import Image from 'next/image'

const LibroCard = ({ book }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`/images/${book.coverImage}`}
          alt={book.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Por: {book.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default LibroCard