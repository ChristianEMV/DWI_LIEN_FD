"use client";

import React, { useState, useEffect } from "react";
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
  Button,
  Box,
  Alert,
  Fab,
  Snackbar,
  CircularProgress,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import { getUsers, addUser, deleteUser } from "../../services/api";

interface User {
  iduser: number;
  username: string;
  nombre: string;
  email: string;
  phone: string;
  fechanacimiento: string;
}

function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    iduser: 0,
    nombre: "",
    email: "",
    phone: "",
    username: "",
    fechanacimiento: "",
  });
  const [addError, setAddError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        setSnackbarMessage("Error al cargar los usuarios. Intente de nuevo.");
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      setLoading(true);
      try {
        await deleteUser(userToDelete.username);
        setUsers((prevUsers) => prevUsers.filter(user => user.iduser !== userToDelete?.iduser));
        setSnackbarMessage("Usuario eliminado exitosamente");
      } catch (error) {
        setSnackbarMessage("Error al eliminar el usuario. Intente de nuevo.");
      } finally {
        setOpenSnackbar(true);
        setLoading(false);
        handleCloseDeleteDialog();
      }
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  const handleEditUserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log("Usuario editado:", selectedUser);
      setSnackbarMessage("Usuario editado exitosamente");
      setOpenSnackbar(true);
      setLoading(false);
      handleCloseModal();
    }, 1000);
  };

  const handleEditUserChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setNewUser({
      iduser: 0,
      nombre: "",
      email: "",
      phone: "",
      fechanacimiento: "",
      username: "",
    });
    setAddError("");
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

  const handleAddUserSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !newUser.nombre ||
      !newUser.email ||
      !newUser.phone ||
      !newUser.fechanacimiento ||
      !newUser.username
    ) {
      setAddError("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);

    try {
      const addedUser = await addUser(newUser);
      setUsers((prevUsers) => [...prevUsers, addedUser]);
      setSnackbarMessage("Usuario agregado exitosamente");
      setNewUser({
        iduser: 0,
        nombre: "",
        email: "",
        phone: "",
        fechanacimiento: "",
        username: "",
      });
      setAddError("");
    } catch (error) {
      setAddError("Error al agregar usuario. Intente de nuevo.");
    } finally {
      setLoading(false);
      handleCloseAddModal();
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: "center" }}>
        Usuarios
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2", color: "#fff" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Nombre
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Usuario
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Correo Electrónico
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Teléfono
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Fecha Nacimiento
              </TableCell>
              <TableCell
                sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user.iduser}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f7f7f7" : "#ffffff",
                }}
              >
                <TableCell>{user.iduser}</TableCell>
                <TableCell>{user.nombre}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.fechanacimiento}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Editar">
                    <IconButton
                      aria-label="editar"
                      color="primary"
                      onClick={() => handleEditClick(user)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      aria-label="eliminar"
                      color="error"
                      onClick={() => handleDeleteClick(user)}
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
        {selectedUser && (
          <form onSubmit={handleEditUserSubmit}>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="nombre"
                  label="Nombre"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={selectedUser.nombre}
                  onChange={(e) => handleEditUserChange(e, "nombre")}
                  required
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="username"
                  label="Nombre de Usuario"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={selectedUser.username}
                  onChange={(e) => handleEditUserChange(e, "username")}
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
                  onChange={(e) => handleEditUserChange(e, "email")}
                  required
                />
                <TextField
                  margin="dense"
                  id="phone"
                  label="Teléfono"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={selectedUser.phone}
                  onChange={(e) => handleEditUserChange(e, "phone")}
                  required
                />
                <TextField
                  margin="dense"
                  id="fechanacimiento"
                  label="Fecha de Nacimiento"
                  type="date"
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={selectedUser.fechanacimiento}
                  onChange={(e) => handleEditUserChange(e, "fechanacimiento")}
                  required
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Cancelar</Button>
              <Button type="submit" color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Guardar"}
              </Button>
            </DialogActions>
          </form>
        )}
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas eliminar este usuario?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddModal} onClose={handleCloseAddModal}>
        <form onSubmit={handleAddUserSubmit}>
          <DialogTitle>Agregar Usuario</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                autoFocus
                margin="dense"
                id="nombre"
                label="Nombre"
                type="text"
                fullWidth
                variant="outlined"
                value={newUser.nombre}
                onChange={(e) => handleAddUserChange(e, "nombre")}
                required
              />
              <TextField
                margin="dense"
                id="username"
                label="Nombre de Usuario"
                type="text"
                fullWidth
                variant="outlined"
                value={newUser.username}
                onChange={(e) => handleAddUserChange(e, "username")}
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
                onChange={(e) => handleAddUserChange(e, "email")}
                required
              />
              <TextField
                margin="dense"
                id="phone"
                label="Teléfono"
                type="text"
                fullWidth
                variant="outlined"
                value={newUser.phone}
                onChange={(e) => handleAddUserChange(e, "phone")}
                required
              />
              <TextField
                margin="dense"
                id="fechanacimiento"
                label="Fecha de Nacimiento"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={newUser.fechanacimiento}
                onChange={(e) => handleAddUserChange(e, "fechanacimiento")}
                required
              />
            </Box>
            {addError && <Alert severity="error" sx={{ mt: 2 }}>{addError}</Alert>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddModal}>Cancelar</Button>
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Agregar"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpenAddModal}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <PersonAddIcon />
      </Fab>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarMessage.includes("error") ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Page;
