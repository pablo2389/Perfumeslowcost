import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const ShippingCalculator = () => {
  const [address, setAddress] = useState("");
  const [cost, setCost] = useState(null);

  const baseAddress = "Tu dirección o coordenadas base";

  // Simulación básica de cálculo (por longitud del string de dirección)
  const calcularCostoEnvio = () => {
    if (!address) {
      setCost(null);
      return;
    }

    // Ejemplo ficticio: más larga la dirección, más caro
    const length = address.length;
    let precio;
    if (length < 20) precio = 100;
    else if (length < 40) precio = 200;
    else precio = 300;

    setCost(precio);
  };

  return (
    <Box sx={{ p: 2, mt: 4, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Calculadora de envío
      </Typography>
      <TextField
        label="Dirección de entrega"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        margin="normal"
        placeholder="Ingrese su dirección"
      />
      <Button variant="contained" onClick={calcularCostoEnvio} fullWidth>
        Calcular costo de envío
      </Button>
      {cost !== null && (
        <Typography sx={{ mt: 2 }}>
          Costo estimado de envío: <strong>${cost}</strong>
        </Typography>
      )}
    </Box>
  );
};

export default ShippingCalculator;
