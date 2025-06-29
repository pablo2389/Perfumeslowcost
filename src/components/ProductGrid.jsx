import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import perfumes from "../data/perfumes";

const ProductGrid = ({ category, cart, setCart, setCartOpen }) => {
  const [quantities, setQuantities] = useState({});

  const handleAddToCart = (perfume) => {
    const qty = quantities[perfume.id] || 1;
    const existing = cart.find((item) => item.id === perfume.id);
    if (existing) {
      const updated = cart.map((item) =>
        item.id === perfume.id
          ? { ...item, cantidad: item.cantidad + qty }
          : item
      );
      setCart(updated);
    } else {
      setCart([...cart, { ...perfume, cantidad: qty }]);
    }
    if (setCartOpen) setCartOpen(true); // Abre el Drawer del carrito
  };

  const filteredPerfumes =
    category === "todos"
      ? perfumes
      : perfumes.filter((p) => p.genero === category.slice(0, -1));

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        p: { xs: 1, md: 3 },
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          textAlign: "center",
          fontWeight: "bold",
          textTransform: "capitalize",
          fontSize: { xs: "1.2rem", sm: "1.6rem" },
        }}
      >
        {category}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          },
          gap: 2,
          width: "100%",
          minWidth: 0,
          boxSizing: "border-box",
        }}
      >
        {filteredPerfumes.map((perfume) => (
          <Card key={perfume.id}>
            <CardMedia
              component="img"
              image={perfume.imagen}
              alt={perfume.nombre}
              sx={{ height: 220, objectFit: "contain", background: "#f4f4f4" }}
            />
            <CardContent>
              <Typography variant="h6">{perfume.nombre}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {perfume.descripcion}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                ${perfume.precio}
              </Typography>
              <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                <TextField
                  label="Cantidad"
                  type="number"
                  size="small"
                  inputProps={{ min: 1 }}
                  value={quantities[perfume.id] || 1}
                  onChange={(e) =>
                    setQuantities({
                      ...quantities,
                      [perfume.id]: Math.max(1, parseInt(e.target.value) || 1),
                    })
                  }
                  sx={{ width: 80, mr: 1 }}
                />
                <Button
                  variant="contained"
                  onClick={() => handleAddToCart(perfume)}
                >
                  Agregar
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ProductGrid;