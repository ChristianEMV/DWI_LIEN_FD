'use client';

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Container,
  Button,
  CardContent,
  Card,
  CardMedia,
} from "@mui/material";
import LibroCard from "../../components/LibroCard";

const page = () => {
  const books = [
    {
      id: 1,
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      description:
        "La historia de la familia Buendía a lo largo de siete generaciones en el ficticio pueblo de Macondo.",
      coverImage: "cien-anos-de-soledad.jpg",
    },
    {
      id: 2,
      title: "El principito",
      author: "Antoine de Saint-Exupéry",
      description:
        "Un cuento poético y filosófico sobre un pequeño príncipe que viaja por diferentes planetas.",
      coverImage: "el-principito.jpg",
    },
    {
      id: 3,
      title: "Don Quijote de la Mancha",
      author: "Miguel de Cervantes",
      description:
        "Las aventuras de un hidalgo que, influenciado por la lectura de libros de caballerías, decide convertirse en caballero andante.",
      coverImage: "don-quijote.jpg",
    },
    {
      id: 4,
      title: "Don Quijote de la Mancha",
      author: "Miguel de Cervantes",
      description:
        "Las aventuras de un hidalgo que, influenciado por la lectura de libros de caballerías, decide convertirse en caballero andante.",
      coverImage: "don-quijote.jpg",
    },
    {
      id: 5,
      title: "Don Quijote de la Mancha",
      author: "Miguel de Cervantes",
      description:
        "Las aventuras de un hidalgo que, influenciado por la lectura de libros de caballerías, decide convertirse en caballero andante.",
      coverImage: "don-quijote.jpg",
    },

    {
      id: 6,
      title: "Don Quijote de la Mancha",
      author: "Miguel de Cervantes",
      description:
        "Las aventuras de un hidalgo que, influenciado por la lectura de libros de caballerías, decide convertirse en caballero andante.",
      coverImage: "don-quijote.jpg",
    },
  ];

  return (
    <div style={{ paddingTop: '90px' }}>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {books.map((book) => (
            <Grid item key={book.id} xs={12} sm={6} md={4}>
              <LibroCard book={book} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default page;
