"use client";

import React, { useState, useEffect, FormEvent } from "react";
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
  Alert,
  CircularProgress,
  TablePagination,
  Box,
  Snackbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../../services/api";

interface Book {
  idbook: number;
  titulo: string;
  autor: string;
  fecha_publicacion: string;
  editorial: string;
  categoria: string;
  descripcion: string;
  status: boolean;
}

export default function BookTable() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [newBook, setNewBook] = useState<Book>({
    idbook: 0,
    titulo: "",
    autor: "",
    fecha_publicacion: "",
    editorial: "",
    categoria: "",
    descripcion: "",
    status: true,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (err) {
        setError("Error al recuperar los libros");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleAddBookChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: keyof Book
  ) => {
    const value = event.target.value;
    if (field === "status") {
      setNewBook((prevBook) => ({
        ...prevBook,
        [field]: value === "true",
      }));
    } else {
      setNewBook((prevBook) => ({
        ...prevBook,
        [field]: value,
      }));
    }
  };

  const handleEditClick = (book: Book) => {
    setSelectedBook(book);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBook(null);
  };

  const handleEditBookChange = (
    event: React.ChangeEvent<{ value: unknown }>,
    field: keyof Book
  ) => {
    const value = event.target.value;
    if (field === "status") {
      setSelectedBook((prevBook) =>
        prevBook ? { ...prevBook, [field]: value === "true" } : prevBook
      );
    } else {
      setSelectedBook((prevBook) =>
        prevBook ? { ...prevBook, [field]: value } : prevBook
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedBook) {
      try {
        const updatedBook = await updateBook(selectedBook);
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.idbook === updatedBook.idbook ? updatedBook : book
          )
        );
        handleCloseModal();
        setSnackbarMessage("Libro actualizado con éxito");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      } catch (error) {
        setError("Error al actualizar el libro");
      }
    }
  };

  const handleDeleteClick = (book: Book) => {
    setBookToDelete(book);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setBookToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (bookToDelete) {
      try {
        await deleteBook(bookToDelete.idbook);
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book.idbook !== bookToDelete.idbook)
        );
        handleCloseDeleteDialog();
        setSnackbarMessage("Libro eliminado con éxito");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      } catch (error) {
        setError("Error al eliminar el libro");
        setSnackbarMessage("Error al eliminar el libro");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    }
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedBooks = books.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleAddBookSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const addedBook = await createBook(newBook);
      setBooks((prevBooks) => [...prevBooks, addedBook]);
      handleCloseAddModal();
      setSnackbarMessage("Libro agregado con éxito");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      setError("Error al agregar el libro");
      setSnackbarMessage("Error al agregar el libro");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ mb: 4, textAlign: "center" }}
          >
            Biblioteca
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              px: 2,
            }}
          >
            <TableContainer
              component={Paper}
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                overflow: "hidden",
                width: "100%",
              }}
            >
              <Table>
                <TableHead sx={{ backgroundColor: "#1976d2", color: "#fff" }}>
                  <TableRow>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                      ID
                    </TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                      Título
                    </TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                      Autor
                    </TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                      Fecha de Publicación
                    </TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                      Editorial
                    </TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                      Categoría
                    </TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                      Descripción
                    </TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                      Estado
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Acciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedBooks.map((book, index) => (
                    <TableRow key={book.idbook}>
                      <TableCell>{book.idbook}</TableCell>
                      <TableCell>{book.titulo}</TableCell>
                      <TableCell>{book.autor}</TableCell>
                      <TableCell>{book.fecha_publicacion}</TableCell>
                      <TableCell>{book.editorial}</TableCell>
                      <TableCell>{book.categoria}</TableCell>
                      <TableCell>{book.descripcion}</TableCell>
                      <TableCell>
                        {book.status ? "Disponible" : "No Disponible"}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Editar">
                          <IconButton
                            color="primary"
                            onClick={() => handleEditClick(book)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton
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
          </Box>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={books.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Box sx={{ position: "absolute", bottom: 16, right: 16 }}>
            <Tooltip title="Agregar Libro">
              <Fab
                aria-label="add"
                sx={{
                  position: "fixed",
                  bottom: 16,
                  right: 16,
                  backgroundColor: "#13a984",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#08624c",
                  },
                }}
                onClick={handleOpenAddModal}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </Box>

          <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>Editar Libro</DialogTitle>
            <DialogContent>
              {selectedBook && (
                <form onSubmit={handleSubmit}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Título"
                    value={selectedBook.titulo}
                    onChange={(e) => handleEditBookChange(e, "titulo")}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Autor"
                    value={selectedBook.autor}
                    onChange={(e) => handleEditBookChange(e, "autor")}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Fecha de Publicación"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={selectedBook.fecha_publicacion}
                    onChange={(e) =>
                      handleEditBookChange(e, "fecha_publicacion")
                    }
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Editorial"
                    value={selectedBook.editorial}
                    onChange={(e) => handleEditBookChange(e, "editorial")}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Categoría"
                    value={selectedBook.categoria}
                    onChange={(e) => handleEditBookChange(e, "categoria")}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Descripción"
                    multiline
                    rows={4}
                    value={selectedBook.descripcion}
                    onChange={(e) => handleEditBookChange(e, "descripcion")}
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Estado</InputLabel>
                    <Select
                      value={selectedBook.status ? "true" : "false"}
                      onChange={(e) => handleEditBookChange(e, "status")}
                    >
                      <MenuItem value="true">Disponible</MenuItem>
                      <MenuItem value="false">No Disponible</MenuItem>
                    </Select>
                  </FormControl>
                  <DialogActions>
                    <Button onClick={handleCloseModal}>Cancelar</Button>
                    <Button type="submit" color="primary">
                      Guardar
                    </Button>
                  </DialogActions>
                </form>
              )}
            </DialogContent>
          </Dialog>

          <Dialog open={openAddModal} onClose={handleCloseAddModal}>
            <DialogTitle>Agregar Libro</DialogTitle>
            <DialogContent>
              <form onSubmit={handleAddBookSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Título"
                  value={newBook.titulo}
                  onChange={(e) => handleAddBookChange(e, "titulo")}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Autor"
                  value={newBook.autor}
                  onChange={(e) => handleAddBookChange(e, "autor")}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Fecha de Publicación"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={newBook.fecha_publicacion}
                  onChange={(e) => handleAddBookChange(e, "fecha_publicacion")}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Editorial"
                  value={newBook.editorial}
                  onChange={(e) => handleAddBookChange(e, "editorial")}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Categoría"
                  value={newBook.categoria}
                  onChange={(e) => handleAddBookChange(e, "categoria")}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Descripción"
                  multiline
                  rows={4}
                  value={newBook.descripcion}
                  onChange={(e) => handleAddBookChange(e, "descripcion")}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Estado</InputLabel>
                  <Select
                    value={newBook.status ? "true" : "false"}
                    onChange={(e) => handleAddBookChange(e, "status")}
                  >
                    <MenuItem value="true">Disponible</MenuItem>
                    <MenuItem value="false">No Disponible</MenuItem>
                  </Select>
                </FormControl>
                <DialogActions>
                  <Button onClick={handleCloseAddModal}>Cancelar</Button>
                  <Button type="submit" color="primary">
                    Agregar
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogContent>
              <Alert severity="warning">
                ¿Estás seguro de que deseas eliminar el libro{" "}
                <strong>{bookToDelete?.titulo}</strong>? Esta acción no se puede
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
            onClose={() => setOpenSnackbar(false)}
            message={snackbarMessage}
          >
            <Alert
              onClose={() => setOpenSnackbar(false)}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
}
