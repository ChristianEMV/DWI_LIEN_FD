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
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContentText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  description: string;
  status: "En stock" | "En préstamo";
}

const books: Book[] = [
  {
    id: 1,
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    year: 1967,
    description: "...",
    status: "En stock",
  },
  {
    id: 2,
    title: "El principito",
    author: "Antoine de Saint-Exupéry",
    year: 1943,
    description: "...",
    status: "En préstamo",
  },
];

export default function BookTable() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  const handleDeleteClick = (book: Book) => {
    setBookToDelete(book);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setBookToDelete(null);
  };

  const handleConfirmDelete = () => {
    // Lógica para eliminar el libro
    console.log("Eliminando libro:", bookToDelete?.id);
    handleCloseDeleteDialog();
  };

  const handleEditClick = (book: Book) => {
    setSelectedBook(book);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBook(null);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Lógica para enviar los datos editados al backend
    console.log("Datos editados:", selectedBook);
    handleCloseModal();
  };
  return (
    <>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Año</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.year}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell>{book.status}</TableCell>
                <TableCell>
                  <Tooltip title="Editar">
                    <IconButton
                      aria-label="editar"
                      color="primary"
                      onClick={() => handleEditClick(book)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      aria-label="eliminar"
                      color="error"
                      onClick={() => handleDeleteClick(book)}
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
        <form onSubmit={handleSubmit}>
          <DialogTitle>Editar Libro</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Título"
              type="text"
              fullWidth
              variant="standard"
              value={selectedBook?.title || ""}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, title: e.target.value })
              }
            />
            <TextField
              margin="dense"
              id="author"
              label="Autor"
              type="text"
              fullWidth
              variant="standard"
              value={selectedBook?.author || ""}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, author: e.target.value })
              }
            />
            <TextField
              margin="dense"
              id="year"
              label="Año"
              type="number"
              fullWidth
              variant="standard"
              value={selectedBook?.year || ""}
              onChange={(e) =>
                setSelectedBook({
                  ...selectedBook,
                  year: parseInt(e.target.value, 10),
                })
              }
            />
            <TextField
              margin="dense"
              id="description"
              label="Descripción"
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="standard"
              value={selectedBook?.description || ""}
              onChange={(e) =>
                setSelectedBook({
                  ...selectedBook,
                  description: e.target.value,
                })
              }
            />
            <br></br>
            <FormControl fullWidth margin="dense">
              <br></br>
              <InputLabel id="status-label">Estado</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                value={selectedBook?.status || "En stock"}
                onChange={(e) =>
                  setSelectedBook({
                    ...selectedBook,
                    status: e.target.value as "En stock" | "En préstamo",
                  })
                }
              >
                <MenuItem value="En stock">En stock</MenuItem>
                <MenuItem value="En préstamo">En préstamo</MenuItem>
              </Select>
            </FormControl>
            <input type="file" accept="image/*" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button type="submit" color="primary">
              Guardar Cambios
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres eliminar el libro "
            {bookToDelete?.title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
