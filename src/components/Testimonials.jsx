import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const testimonios = [
  { id: 1, texto: "Muy buen servicio, 100% recomendable.", autor: "Juan P." },
  { id: 2, texto: "Los perfumes llegan rápido y en buen estado.", autor: "María G." },
  { id: 3, texto: "Excelente atención al cliente.", autor: "Carlos R." },
];

const Testimonials = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>
      Testimonios
    </Typography>
    {testimonios.map(({ id, texto, autor }) => (
      <Paper key={id} sx={{ mb: 2, p: 2 }}>
        <Typography>"{texto}"</Typography>
        <Typography variant="subtitle2" sx={{ mt: 1, fontStyle: "italic" }}>
          - {autor}
        </Typography>
      </Paper>
    ))}
  </Box>
);

export default Testimonials;
