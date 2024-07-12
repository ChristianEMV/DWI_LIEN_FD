import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Container,
  Button,
  CardContent,
  Card,
  CardMedia,
  CardActionArea,
  Modal,
  Tooltip,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface LibroCardProps {
  book: {
    id: number;
    title: string;
    author: string;
    description: string;
    coverImage: string;
    available: boolean;
  };
}

const LibroCard: React.FC<LibroCardProps> = ({ book }) => {
  const [openModal, setOpenModal] = useState(false);
  const [solicitudModal, setSolicitudModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenSolicitudModal = () => setSolicitudModal(true);
  const handleCloseSolicitudModal = () => setSolicitudModal(false);

  return (
    <>
      <Card sx={{ maxWidth: 345 }} onClick={handleOpenModal}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={`/images/${book.coverImage}`}
            alt={book.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {book.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Por: {book.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {book.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
          <Tooltip title={book.available ? "Disponible" : "No disponible"}>
            <IconButton
              size="small"
              color={book.available ? "success" : "error"}
            >
              {book.available ? <CheckCircleIcon /> : <CancelIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Card>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            outline: "none",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Image
                src={`/images/${book.coverImage}`}
                alt={book.title}
                width={200}
                height={300}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                {book.title}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Por: {book.author}
              </Typography>
              <Typography variant="body1" paragraph>
                {book.description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
            <Link 
                  href={{
                    pathname: '/solicitud',
                    query: { book: JSON.stringify(book) },
                  }}
                  legacyBehavior
                >
                  <Button variant="contained" color="primary">
                    Solicitar Libro
                  </Button>
                </Link>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default LibroCard;
