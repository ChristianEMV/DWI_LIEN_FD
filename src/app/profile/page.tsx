"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ProfileLayout from "./layout";
const userData = {
  name: "Nombre del Usuario",
  email: "usuario@example.com",
  avatar: "/images/avatar.jpg",
};

const loanData = [
  {
    book: "Libro 1",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    intro: "Introducción del libro 1",
  },
  {
    book: "Libro 2",
    startDate: "2023-12-20",
    endDate: "2024-01-10",
    intro: "Introducción del libro 2",
  },
];

function page() {
  return (
    <ProfileLayout>
      <Box sx={{ padding: 2 }}>
      <Card>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar
                alt={userData.name}
                src={userData.avatar}
                sx={{ width: 56, height: 56 }}
              >
                <PersonIcon />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h5" component="div">
                {userData.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userData.email}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabla de préstamos */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Libro</TableCell>
              <TableCell>Fecha Inicio</TableCell>
              <TableCell>Fecha Fin</TableCell>
              <TableCell>Introducción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loanData.map((loan, index) => (
              <TableRow key={index}>
                <TableCell>{loan.book}</TableCell>
                <TableCell>{loan.startDate}</TableCell>
                <TableCell>{loan.endDate}</TableCell>
                <TableCell>{loan.intro}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </ProfileLayout>
  );
}

export default page;
