'use client';

import React, { useState, useEffect, FormEvent } from 'react';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getBooks, updateBook, deleteBook} from '../../services/api';

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
    titulo: '',
    autor: '',
    fecha_publicacion: '',
    editorial: '',
    categoria: '',
    descripcion: '',
    status: true,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (err) {
        setError('Error al recuperar los libros');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleAddBookChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: keyof Book) => {
    setNewBook((prevBook) => ({
      ...prevBook,
      [field]: event.target.value,
    }));
  };

  const handleEditClick = (book: Book) => {
    setSelectedBook(book);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBook(null);
  };

  const handleEditBookChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: keyof Book) => {
    setSelectedBook((prevBook) =>
      prevBook ? { ...prevBook, [field]: event.target.value } : prevBook
    );
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
        setSnackbarMessage('Libro actualizado con éxito');
        setOpenSnackbar(true);
      } catch (error) {
        setError('Error al actualizar el libro');
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
        setSnackbarMessage('Libro eliminado con éxito');
        setOpenSnackbar(true);
      } catch (error) {
        setError('Error al eliminar el libro');
      }
    }
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedBooks = books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  function handleAddBookSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              overflow: 'hidden',
              margin: 2
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Título</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Autor</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Fecha de Publicación</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Editorial</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Categoría</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedBooks.map((book, index) => (
                  <TableRow
                    key={book.idbook}
                    sx={{
                      backgroundColor: index % 2 === 0 ? '#fafafa' : '#ffffff',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                      }
                    }}
                  >
                    <TableCell>{book.idbook}</TableCell>
                    <TableCell>{book.titulo}</TableCell>
                    <TableCell>{book.autor}</TableCell>
                    <TableCell>{book.fecha_publicacion}</TableCell>
                    <TableCell>{book.editorial}</TableCell>
                    <TableCell>{book.categoria}</TableCell>
                    <TableCell>{book.descripcion}</TableCell>
                    <TableCell>{book.status ? 'En stock' : 'En préstamo'}</TableCell>
                    <TableCell>
                      <Tooltip title="Editar">
                        <IconButton
                          aria-label="editar"
                          color="primary"
                          sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 255, 0.1)' } }}
                          onClick={() => handleEditClick(book)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton
                          aria-label="eliminar"
                          color="error"
                          sx={{ '&:hover': { backgroundColor: 'rgba(255, 0, 0, 0.1)' } }}
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
            <TablePagination
              sx={{ marginTop: 2 }}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={books.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
          <Dialog open={openModal} onClose={handleCloseModal}>
            <form onSubmit={handleSubmit}>
              <DialogTitle>Editar Libro</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="titulo"
                  label="Título"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={selectedBook?.titulo || ''}
                  onChange={(e) => handleEditBookChange(e, 'titulo')}
                />
                <TextField
                  margin="dense"
                  id="autor"
                  label="Autor"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={selectedBook?.autor || ''}
                  onChange={(e) => handleEditBookChange(e, 'autor')}
                />
                <TextField
                  margin="dense"
                  id="fecha_publicacion"
                  label="Fecha de Publicación"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  value={selectedBook?.fecha_publicacion || ''}
                  onChange={(e) => handleEditBookChange(e, 'fecha_publicacion')}
                />
                <TextField
                  margin="dense"
                  id="editorial"
                  label="Editorial"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={selectedBook?.editorial || ''}
                  onChange={(e) => handleEditBookChange(e, 'editorial')}
                />
                <TextField
                  margin="dense"
                  id="categoria"
                  label="Categoría"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={selectedBook?.categoria || ''}
                  onChange={(e) => handleEditBookChange(e, 'categoria')}
                />
                <TextField
                  margin="dense"
                  id="descripcion"
                  label="Descripción"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={selectedBook?.descripcion || ''}
                  onChange={(e) => handleEditBookChange(e, 'descripcion')}
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel>Estado</InputLabel>
                  <Select
                    value={selectedBook?.status ? 'En stock' : 'En préstamo'}
                    onChange={(e) => handleEditBookChange(e, 'status')}
                    label="Estado"
                  >
                    <MenuItem value="true">En stock</MenuItem>
                    <MenuItem value="false">En préstamo</MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal}>Cancelar</Button>
                <Button type="submit">Guardar</Button>
              </DialogActions>
            </form>
          </Dialog>
          <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Estás seguro de que deseas eliminar este libro?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
              <Button onClick={handleConfirmDelete} color="error">Eliminar</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openAddModal} onClose={handleCloseAddModal}>
            <form onSubmit={handleAddBookSubmit}>
              <DialogTitle>Agregar Nuevo Libro</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="titulo"
                  label="Título"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newBook.titulo}
                  onChange={(e) => handleAddBookChange(e, 'titulo')}
                />
                <TextField
                  margin="dense"
                  id="autor"
                  label="Autor"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newBook.autor}
                  onChange={(e) => handleAddBookChange(e, 'autor')}
                />
                <TextField
                  margin="dense"
                  id="fecha_publicacion"
                  label="Fecha de Publicación"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  value={newBook.fecha_publicacion}
                  onChange={(e) => handleAddBookChange(e, 'fecha_publicacion')}
                />
                <TextField
                  margin="dense"
                  id="editorial"
                  label="Editorial"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newBook.editorial}
                  onChange={(e) => handleAddBookChange(e, 'editorial')}
                />
                <TextField
                  margin="dense"
                  id="categoria"
                  label="Categoría"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newBook.categoria}
                  onChange={(e) => handleAddBookChange(e, 'categoria')}
                />
                <TextField
                  margin="dense"
                  id="descripcion"
                  label="Descripción"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newBook.descripcion}
                  onChange={(e) => handleAddBookChange(e, 'descripcion')}
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel>Estado</InputLabel>
                  <Select
                    value={newBook.status ? 'En stock' : 'En préstamo'}
                    onChange={(e) => handleAddBookChange(e, 'status')}
                    label="Estado"
                  >
                    <MenuItem value="true">En stock</MenuItem>
                    <MenuItem value="false">En préstamo</MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseAddModal}>Cancelar</Button>
                <Button type="submit">Agregar</Button>
              </DialogActions>
            </form>
          </Dialog>
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleOpenAddModal}
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
          >
            <AddIcon />
          </Fab>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
            message={snackbarMessage}
          />
          {error && <Alert severity="error">{error}</Alert>}
        </>
      )}
    </>
  );
}
