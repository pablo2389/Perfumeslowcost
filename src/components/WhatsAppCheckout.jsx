import React from "react";
import { Box, Typography, Button, IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const WhatsAppCheckout = ({ cart, setCart }) => {
  const phoneNumber = "5492616616758";

  const buildMessage = () => {
    if (cart.length === 0) return "No hay productos en el carrito.";

    let mensaje = "Hola, quiero hacer el pedido a Perfume Low Cost:\n\n";
    cart.forEach(({ id, nombre, cantidad, precio, imagen }) => {
      mensaje += `- ${nombre || `Perfume ID: ${id}`} \n  Cantidad: ${cantidad}\n  Precio unitario: $${precio}\n\n`;
      if (imagen) {
        mensaje += `Foto: ${imagen}\n\n`;  // Aquí corregido para no concatenar origen local
      }
    });

    const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    mensaje += `Total estimado: $${total}\n\n¡Gracias!`;

    return encodeURIComponent(mensaje);
  };

  const handleSendWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${buildMessage()}`;
    window.open(url, "_blank");
  };

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  if (cart.length === 0)
    return (
      <Paper elevation={3} sx={{ p: 2, mt: 4, textAlign: "center" }}>
        <Typography variant="body1">El carrito está vacío</Typography>
      </Paper>
    );

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Resumen del Pedido
      </Typography>

      {cart.map(({ id, nombre, cantidad }) => (
        <Box
          key={id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography>{`${nombre || `ID: ${id}`} x ${cantidad}`}</Typography>
          <IconButton color="error" onClick={() => handleRemove(id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Typography sx={{ mt: 2, fontWeight: "bold", textAlign: "right" }}>
        Total: ${cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0)}
      </Typography>

      <Button
        variant="contained"
        color="success"
        sx={{ mt: 2 }}
        fullWidth
        onClick={handleSendWhatsApp}
      >
        Enviar pedido por WhatsApp
      </Button>
    </Paper>
  );
};

export default WhatsAppCheckout;
