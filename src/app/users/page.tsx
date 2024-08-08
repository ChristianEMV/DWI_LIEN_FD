'use client';

import React, { useState } from 'react';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

const users: User[] = [
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', phone: '123-456-7890', role: 'Administrador' },
  { id: 2, name: 'María Gómez', email: 'maria@example.com', phone: '987-654-3210', role: 'Usuario' },
];

function page() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setUserToDelete(null);
  };

  const handleConfirmDelete = () => {
    setLoading(true);
    setTimeout(() => {
      console.log('Eliminando usuario:', userToDelete?.id);
      setSnackbarMessage('Usuario eliminado exitosamente');
      setOpenSnackbar(true);
      setLoading(false);
      handleCloseDeleteDialog();
    }, 1000); // Simula un retardo de 1 segundo para la eliminación
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  const handleEditUserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log('Usuario editado:', selectedUser);
      setSnackbarMessage('Usuario editado exitosamente');
      setOpenSnackbar(true);
      setLoading(false);
      handleCloseModal();
    }, 1000); // Simula un retardo de 1 segundo para la edición
  };

  const handleEditUserChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    field: keyof User
  ) => {
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [field]: event.target.value,
    }));
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const [openAddModal, setOpenAddModal] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    phone: '',
    role: '',
  });
  const [addError, setAddError] = useState('');

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setNewUser({ id: 0, name: '', email: '', phone: '', role: '' });
    setAddError('');
  };

  const handleAddUserChange = (
    event: React.ChangeEvent<{ value: unknown }>,
    field: keyof User
  ) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      [field]: event.target.value as string,
    }));
  };

  const handleAddUserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newUser.name || !newUser.email || !newUser.phone || !newUser.role) {
      setAddError('Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log('Agregando nuevo usuario:', newUser);
      setSnackbarMessage('Usuario agregado exitosamente');
      setOpenSnackbar(true);
      setNewUser({ id: 0, name: '', email: '', phone: '', role: '' });
      setAddError('');
      setLoading(false);
      handleCloseAddModal();
    }, 1000); // Simula un retardo de 1 segundo para la adición
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Correo Electrónico</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id} sx={{ backgroundColor: index % 2 === 0 ? '#f7f7f7' : '#ffffff' }}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Editar">
                    <IconButton aria-label="editar" color="primary" onClick={() => handleEditClick(user)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton aria-label="eliminar" color="error" onClick={() => handleDeleteClick(user)}>
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
        {selectedUser && (
          <form onSubmit={handleEditUserSubmit}>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Nombre"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={selectedUser.name}
                  onChange={(e) => handleEditUserChange(e, 'name')}
                  required
                />
                <TextField
                  margin="dense"
                  id="email"
                  label="Correo Electrónico"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={selectedUser.email}
                  onChange={(e) => handleEditUserChange(e, 'email')}
                  required
                />
                <TextField
                  margin="dense"
                  id="phone"
                  label="Teléfono"
                  type="tel"
                  fullWidth
                  variant="outlined"
                  value={selectedUser.phone}
                  onChange={(e) => handleEditUserChange(e, 'phone')}
                  required
                />
                <FormControl fullWidth>
                  <InputLabel id="role-label">Rol</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    value={selectedUser.role}
                    onChange={(e) => handleEditUserChange(e, 'role')}
                    required
                  >
                    <MenuItem value="Administrador">Administrador</MenuItem>
                    <MenuItem value="Usuario">Usuario</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Cancelar</Button>
              <Button type="submit" color="primary">
                Guardar Cambios
              </Button>
            </DialogActions>
          </form>
        )}
      </Dialog>

      <Dialog open={openAddModal} onClose={handleCloseAddModal}>
        <form onSubmit={handleAddUserSubmit}>
          <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nombre"
                type="text"
                fullWidth
                variant="outlined"
                value={newUser.name}
                onChange={(e) => handleAddUserChange(e, 'name')}
                required
              />
              <TextField
                margin="dense"
                id="email"
                label="Correo Electrónico"
                type="email"
                fullWidth
                variant="outlined"
                value={newUser.email}
                onChange={(e) => handleAddUserChange(e, 'email')}
                required
              />
              <TextField
                margin="dense"
                id="phone"
                label="Teléfono"
                type="tel"
                fullWidth
                variant="outlined"
                value={newUser.phone}
                onChange={(e) => handleAddUserChange(e, 'phone')}
                required
              />
              <FormControl fullWidth>
                <InputLabel id="role-label">Rol</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  value={newUser.role}
                  onChange={(e) => handleAddUserChange(e, 'role')}
                  required
                >
                  <MenuItem value="Administrador">Administrador</MenuItem>
                  <MenuItem value="Usuario">Usuario</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {addError && <Alert severity="error">{addError}</Alert>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddModal}>Cancelar</Button>
            <Button type="submit" color="primary">
              Guardar Usuario
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Fab color="primary" aria-label="add" onClick={handleOpenAddModal} sx={{ position: 'fixed', bottom: 16, right: 16, boxShadow: 3 }}>
        <PersonAddIcon />
      </Fab>

      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: 2,
            borderRadius: 2,
            zIndex: 1200,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
  );
}

export default page;
