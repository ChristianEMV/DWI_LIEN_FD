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
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ProfileLayout from "./layout";
import BookIcon from "@mui/icons-material/Book";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import RestoreIcon from '@mui/icons-material/Restore';

const userData = {
  name: "Christian Vergara",
  email: "christianvergara@gmail.com",
  avatar: "/images/avatar.jpg",
};

const loanData = [
  {
    book: "Libro 1",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    intro: "Introducción del libro 1",
    estado: "prestado",
  },
  {
    book: "Libro 2",
    startDate: "2023-12-20",
    endDate: "2024-01-10",
    intro: "Introducción del libro 2",
    estado: "devuelto",
  },
];

function page() {
  return (
    <ProfileLayout>
      <Box sx={{ padding: 3 }}>
        <Card
          sx={{
            background: "linear-gradient(135deg, #ece9e6, #ffffff)",
            padding: 2,
          }}
        >
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar
                  alt={userData.name}
                  src={userData.avatar}
                  sx={{
                    width: 80,
                    height: 80,
                    border: "3px solid #3f51b5",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                  }}
                >
                  <PersonIcon />
                </Avatar>
              </Grid>
              <Grid item>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {userData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {userData.email}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <BookIcon /> Libro
                </TableCell>
                <TableCell>Fecha Inicio</TableCell>
                <TableCell>Fecha Fin</TableCell>
                <TableCell>Introducción</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loanData.map((loan, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                  }}
                >
                  <TableCell>{loan.book}</TableCell>
                  <TableCell>{loan.startDate}</TableCell>
                  <TableCell>{loan.endDate}</TableCell>
                  <TableCell>{loan.intro}</TableCell>
                  <TableCell>
                    {loan.estado === "prestado" ? (
                      <RestoreIcon color="warning" />
                    ) : (
                      <CheckCircleIcon color="success" />
                    )}
                    {loan.estado}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color={
                        loan.estado === "prestado" ? "secondary" : "inherit"
                      }
                      startIcon={
                        loan.estado === "prestado" ? (
                          <HowToVoteIcon />
                        ) : (
                          <CheckCircleIcon />
                        )
                      }
                    >
                      {loan.estado === "prestado" ? "Devolver" : "Ver Detalles"}
                    </Button>
                  </TableCell>
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
