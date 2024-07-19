'use client';

import React, { useState } from 'react'
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
  DialogContentText,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Box,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fab } from '@mui/material';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

const users: User[] = [
  { id: 1, name: 'Juan Pénez', email: 'juan@example.com', phone: '123-456-7890', role: 'Administrador' },
  { id: 2, name: 'María Cómez', email: 'maria@example.com', phone: '987-654-3210', role: 'Usuario' },
];

function page() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

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
  console.log('Eliminando usuario:', userToDelete?.id);
  handleCloseDeleteDialog();
};

const handleCloseModal = () => {
  setOpenModal(false);
  setSelectedUser(null);
};

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log('Datos editados:', selectedUser);
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

    console.log('Agregando nuevo usuario:', newUser);

    setNewUser({ id: 0, name: '', email: '', phone: '', role: '' });
    setAddError('');
    handleCloseAddModal();
  };

const handleEditUserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // Validar los datos del usuario editado aquí

  console.log('Usuario editado:', selectedUser);

  handleCloseModal();
};
  return (
    <>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Correo Electrónico</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
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
      <Fab color="primary" aria-label="add" onClick={handleOpenAddModal} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <PersonAddIcon />
      </Fab>
    </>
  )
}

export default page