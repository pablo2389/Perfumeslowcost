import React from "react";
import { Typography, Box, Button } from "@mui/material";

const SellerDashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Bienvenido al Panel de Vendedor
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Aquí podés gestionar productos, ver ventas y actualizar tu stock.
      </Typography>

      {/* Ejemplo simple de botones o secciones */}
      <Button variant="contained" color="primary" sx={{ mr: 2 }}>
        Ver Productos
      </Button>
      <Button variant="outlined" color="secondary">
        Historial de Ventas
      </Button>
    </Box>
  );
};

export default SellerDashboard;
