import React from "react";
import { Typography, Box, Paper } from "@mui/material";

const AboutUs = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 3, sm: 4 },
        mx: "auto",
        maxWidth: 800,
        textAlign: "center",
        wordBreak: "break-word",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        ¿Quiénes somos?
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
        En <strong>Lowcost</strong> nos dedicamos a ofrecer perfumes de calidad al mejor precio del mercado.
        Trabajamos con clones y equivalencias premium que respetan la esencia de las grandes marcas.
      </Typography>
      <Typography variant="body1" paragraph sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
        📍 Estamos en Las Heras, Mendoza.  
        <br />
        📞 Teléfono: <strong>2616616758</strong>  
        <br />
        💳 Transferencias al alias: <strong>34836075.prex</strong>  
        <br />
        💸 Valor fijo: $20.000 por unidad  
        <br />
        🚚 Envíos desde $500 por km
      </Typography>
    </Paper>
  );
};

export default AboutUs;
