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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import { getUsers } from "../../services/api";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
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
    id: 0,
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [addError, setAddError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
      setLoading(false);
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

  const handleConfirmDelete = () => {
    setLoading(true);
    setTimeout(() => {
      console.log("Eliminando usuario:", userToDelete?.id);
      setSnackbarMessage("Usuario eliminado exitosamente");
      setOpenSnackbar(true);
      setLoading(false);
      handleCloseDeleteDialog();
    }, 1000);
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
    setNewUser({ id: 0, name: "", email: "", phone: "", role: "" });
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

  const handleAddUserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newUser.name || !newUser.email || !newUser.phone || !newUser.role) {
      setAddError("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log("Agregando nuevo usuario:", newUser);
      setSnackbarMessage("Usuario agregado exitosamente");
      setOpenSnackbar(true);
      setNewUser({ id: 0, name: "", email: "", phone: "", role: "" });
      setAddError("");
      setLoading(false);
      handleCloseAddModal();
    }, 1000);
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
                Usuario
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Correo Electrónico
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Teléfono
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
                key={user.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f7f7f7" : "#ffffff",
                }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
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
                  id="name"
                  label="Nombre"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={selectedUser.name}
                  onChange={(e) => handleEditUserChange(e, "name")}
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
                  type="tel"
                  fullWidth
                  variant="outlined"
                  value={selectedUser.phone}
                  onChange={(e) => handleEditUserChange(e, "phone")}
                  required
                />
                <FormControl fullWidth>
                  <InputLabel id="role-label">Rol</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    value={selectedUser.role}
                    onChange={(e) => handleEditUserChange(e, "role")}
                    required
                  >
                    <MenuItem value="Administrador">Administrador</MenuItem>
                    <MenuItem value="Usuario">Usuario</MenuItem>
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
            ¿Estás seguro de que deseas eliminar al usuario{" "}
            <strong>{userToDelete?.name}</strong>? Esta acción no se puede
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

      <Dialog open={openAddModal} onClose={handleCloseAddModal}>
        <form onSubmit={handleAddUserSubmit}>
          <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                autoFocus
                margin="dense"
                id="add-name"
                label="Nombre"
                type="text"
                fullWidth
                variant="outlined"
                value={newUser.name}
                onChange={(e) => handleAddUserChange(e, "name")}
                required
              />
              <TextField
                margin="dense"
                id="add-email"
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
                id="add-phone"
                label="Teléfono"
                type="tel"
                fullWidth
                variant="outlined"
                value={newUser.phone}
                onChange={(e) => handleAddUserChange(e, "phone")}
                required
              />
              <FormControl fullWidth>
                <InputLabel id="add-role-label">Rol</InputLabel>
                <Select
                  labelId="add-role-label"
                  id="add-role"
                  value={newUser.role}
                  onChange={(e) => handleAddUserChange(e, "role")}
                  required
                >
                  <MenuItem value="Administrador">Administrador</MenuItem>
                  <MenuItem value="Usuario">Usuario</MenuItem>
                </Select>
              </FormControl>
              {addError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {addError}
                </Alert>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddModal} color="secondary">
              Cancelar
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Agregar Usuario
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Box sx={{ position: "absolute", bottom: 16, right: 16 }}>
        <Tooltip title="Agregar Usuario">
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
            <PersonAddIcon />
          </Fab>
        </Tooltip>
      </Box>

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
