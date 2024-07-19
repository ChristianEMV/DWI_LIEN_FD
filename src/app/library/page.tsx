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
  Fab,
  FormHelperText,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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
  const [openAddModal, setOpenAddModal] = useState(false);
  const [error, setError] = useState("");

  const [newBook, setNewBook] = useState<Book>({
    id: 0,
    title: "",
    author: "",
    year: 0,
    description: "",
    status: "En stock",
  });

  const handleAddBookChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: keyof Book
  ) => {
    setNewBook((prevBook) => ({
      ...prevBook,
      [field]: event.target.value,
    }));
  };

  const handleAddBookSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validaciones
    let isValid = true;
    let errorMessage = "";

    // Título (no vacío)
    if (!newBook.title.trim()) {
      isValid = false;
      errorMessage = "El título es obligatorio.";
    }
    // Autor (no vacío)
    else if (!newBook.author.trim()) {
      isValid = false;
      errorMessage = "El autor es obligatorio.";
    }
    // Año (número válido entre 1450 y el año actual)
    else if (
      isNaN(newBook.year) ||
      newBook.year < 1450 || // Considerando la invención de la imprenta
      newBook.year > new Date().getFullYear()
    ) {
      isValid = false;
      errorMessage =
        "El año debe ser un número válido entre 1450 y el año actual.";
    }
    // Descripción (no vacía)
    else if (!newBook.description.trim()) {
      isValid = false;
      errorMessage = "La descripción es obligatoria.";
    }

    // Enviar los datos al backend
    console.log("Nuevo libro:", newBook);

    // Limpiar el formulario y cerrar el modal
    setNewBook({
      id: 0,
      title: "",
      author: "",
      year: 0,
      description: "",
      status: "En stock",
    });
    handleCloseAddModal();
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

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
      <Dialog open={openAddModal} onClose={handleCloseAddModal}>
        <form onSubmit={handleAddBookSubmit}>
          <DialogTitle>Agregar Nuevo Libro</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Título"
              type="text"
              fullWidth
              variant="standard"
              value={newBook.title}
              onChange={(e) => handleAddBookChange(e, "title")}
              required
            />
            <TextField
              margin="dense"
              id="author"
              label="Autor"
              type="text"
              fullWidth
              variant="standard"
              value={newBook.author}
              onChange={(e) => handleAddBookChange(e, "author")}
              required
            />
            <TextField
              margin="dense"
              id="year"
              label="Año"
              type="number"
              fullWidth
              variant="standard"
              value={newBook.year === 0 ? "" : newBook.year}
              onChange={(e) => handleAddBookChange(e, "year")}
              required
              InputProps={{ inputProps: { min: 0 } }}
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
              value={newBook.description}
              onChange={(e) => handleAddBookChange(e, "description")}
              required
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="status-label" shrink>
                Estado
              </InputLabel>
              <Select
                labelId="status-label"
                id="status"
                value={newBook.status}
                onChange={(e) => handleAddBookChange(e, "status")}
              >
                <MenuItem value="En stock">En stock</MenuItem>
                <MenuItem value="En préstamo">En préstamo</MenuItem>
              </Select>
              <FormHelperText>
                Indica si el libro está disponible.
              </FormHelperText>
            </FormControl>
            <input type="file" accept="image/*" />
            {error && <Alert severity="error">{error}</Alert>}{" "}
            {/* Mostrar mensaje de error */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddModal}>Cancelar</Button>
            <Button type="submit" color="primary">
              Guardar Libro
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpenAddModal}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
