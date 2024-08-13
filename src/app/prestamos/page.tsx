"use client";

import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Box,
  Alert,
  Fab,
  Snackbar,
  CircularProgress,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RestoreIcon from "@mui/icons-material/Restore";

interface Loan {
  id: number;
  bookId: number;
  bookName: string;
  startDate: string;
  endDate: string;
  userEmail: string;
  status: "en préstamo" | "retraso" | "devuelto";
}

const initialLoans: Loan[] = [
  {
    id: 1,
    bookId: 101,
    bookName: "Libro 1",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    userEmail: "usuario1@example.com",
    status: "en préstamo",
  },
  {
    id: 2,
    bookId: 102,
    bookName: "Libro 2",
    startDate: "2024-03-10",
    endDate: "2024-04-10",
    userEmail: "usuario2@example.com",
    status: "retraso",
  },
  {
    id: 3,
    bookId: 103,
    bookName: "Libro 3",
    startDate: "2024-05-01",
    endDate: "2024-06-01",
    userEmail: "usuario3@example.com",
    status: "devuelto",
  },
];

function Page() {
  const [loans, setLoans] = useState<Loan[]>(initialLoans);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loanToDelete, setLoanToDelete] = useState<Loan | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [addError, setAddError] = useState("");

  const handleEditClick = (loan: Loan) => {
    setSelectedLoan(loan);
    setOpenModal(true);
  };

  const handleDeleteClick = (loan: Loan) => {
    setLoanToDelete(loan);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setLoanToDelete(null);
  };

  const handleConfirmDelete = () => {
    setLoading(true);
    setTimeout(() => {
      setLoans(loans.filter((loan) => loan.id !== loanToDelete?.id));
      setSnackbarMessage("Préstamo eliminado exitosamente");
      setOpenSnackbar(true);
      setLoading(false);
      handleCloseDeleteDialog();
    }, 1000);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedLoan(null);
  };

  const handleEditLoanSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoans((prevLoans) =>
        prevLoans.map((loan) =>
          loan.id === selectedLoan?.id ? selectedLoan! : loan
        )
      );
      setSnackbarMessage("Préstamo editado exitosamente");
      setOpenSnackbar(true);
      setLoading(false);
      handleCloseModal();
    }, 1000);
  };

  const handleEditLoanChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: keyof Loan
  ) => {
    setSelectedLoan((prevLoan) => ({
      ...prevLoan!,
      [field]: event.target.value as any,
    }));
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: "center" }}>
        Tabla de Préstamos
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2", color: "#fff" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID Libro</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Nombre del Libro</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Fecha Inicio</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Fecha Fin</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Correo del Usuario</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Estado</TableCell>
              <TableCell
                sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan, index) => (
              <TableRow
                key={loan.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f7f7f7" : "#ffffff",
                }}
              >
                <TableCell>{loan.id}</TableCell>
                <TableCell>{loan.bookId}</TableCell>
                <TableCell>{loan.bookName}</TableCell>
                <TableCell>{loan.startDate}</TableCell>
                <TableCell>{loan.endDate}</TableCell>
                <TableCell>{loan.userEmail}</TableCell>
                <TableCell>
                  {loan.status === "en préstamo" && <RestoreIcon color="warning" />}
                  {loan.status === "retraso" && <CancelIcon color="error" />}
                  {loan.status === "devuelto" && <CheckCircleIcon color="success" />}
                  {loan.status}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Editar">
                    <IconButton
                      aria-label="editar"
                      color="primary"
                      onClick={() => handleEditClick(loan)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      aria-label="eliminar"
                      color="error"
                      onClick={() => handleDeleteClick(loan)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={handleCloseModal}>
        {selectedLoan && (
          <form onSubmit={handleEditLoanSubmit}>
            <DialogTitle>Editar Préstamo</DialogTitle>
            <DialogContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  margin="dense"
                  label="Nombre del Libro"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={selectedLoan.bookName}
                  onChange={(e) => handleEditLoanChange(e, "bookName")}
                  required
                />
                <TextField
                  margin="dense"
                  label="Fecha Inicio"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  value={selectedLoan.startDate}
                  onChange={(e) => handleEditLoanChange(e, "startDate")}
                  required
                />
                <TextField
                  margin="dense"
                  label="Fecha Fin"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  value={selectedLoan.endDate}
                  onChange={(e) => handleEditLoanChange(e, "endDate")}
                  required
                />
                <TextField
                  margin="dense"
                  label="Correo del Usuario"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={selectedLoan.userEmail}
                  onChange={(e) => handleEditLoanChange(e, "userEmail")}
                  required
                />
                <FormControl fullWidth>
                  <InputLabel id="status-label">Estado</InputLabel>
                  <Select
                    labelId="status-label"
                    value={selectedLoan.status}
                    onChange={(e) => handleEditLoanChange(e, "status")}
                    required
                  >
                    <MenuItem value="en préstamo">En Préstamo</MenuItem>
                    <MenuItem value="retraso">Retraso</MenuItem>
                    <MenuItem value="devuelto">Devuelto</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="secondary">
                Cancelar
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Guardar Cambios
              </Button>
            </DialogActions>
          </form>
        )}
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            ¿Estás seguro de que deseas eliminar el préstamo del libro{" "}
            <strong>{loanToDelete?.bookName}</strong>? Esta acción no se puede
            deshacer.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />

      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <CircularProgress size={60} thickness={5} />
        </Box>
      )}
    </>
  );
}

export default Page;
