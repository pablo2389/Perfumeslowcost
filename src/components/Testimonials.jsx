import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const STORAGE_KEY = "perfumeslowcost_testimonials";

const Testimonials = () => {
  const [testimonios, setTestimonios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTestimonios(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonios));
  }, [testimonios]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !comentario.trim() || calificacion === 0) {
      alert("Por favor, completa todos los campos y asigna una calificación.");
      return;
    }
    const nuevoTestimonio = {
      id: Date.now(),
      nombre: nombre.trim(),
      comentario: comentario.trim(),
      calificacion,
      fecha: new Date().toLocaleDateString(),
    };
    setTestimonios([nuevoTestimonio, ...testimonios]);
    setNombre("");
    setComentario("");
    setCalificacion(0);
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: { xs: 2, sm: 3 },
      }}
    >
      <Typography variant="h5" gutterBottom align="center" sx={{ mb: 3 }}>
        Testimonios de nuestros clientes
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          required
          inputProps={{ maxLength: 50 }}
        />
        <TextField
          label="Tu opinión"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          multiline
          rows={3}
          fullWidth
          required
          inputProps={{ maxLength: 300 }}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography>Calificación:</Typography>
          <Rating
            name="calificacion"
            value={calificacion}
            onChange={(_, newValue) => setCalificacion(newValue)}
          />
        </Box>
        <Button type="submit" variant="contained" fullWidth>
          Enviar Testimonio
        </Button>
      </Box>

      <List>
        {testimonios.length === 0 && (
          <Typography variant="body1" align="center">
            No hay testimonios aún.
          </Typography>
        )}
        {testimonios.map(({ id, nombre, comentario, calificacion, fecha }) => (
          <React.Fragment key={id}>
            <ListItem alignItems="flex-start" sx={{ py: 1 }}>
              <ListItemText
                primary={
                  <>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      sx={{ fontWeight: "bold" }}
                    >
                      {nombre}
                    </Typography>{" "}
                    - <small>{fecha}</small>
                    <Box component="span" sx={{ ml: 2 }}>
                      <Rating value={calificacion} readOnly size="small" />
                    </Box>
                  </>
                }
                secondary={
                  <Typography
                    variant="body2"
                    sx={{ whiteSpace: "pre-line" }}
                    color="text.secondary"
                  >
                    {comentario}
                  </Typography>
                }
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Testimonials;
