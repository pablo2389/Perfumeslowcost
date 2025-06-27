import React, { useState, useRef } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  IconButton,
  Grid,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import perfumes from "../data/perfumes";

const ProductGrid = ({ category, cart, setCart, fullView }) => {
  const [quantities, setQuantities] = useState({});
  const scrollRef = useRef(null);

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
  };

  // Filtro perfumes según categoría
  const filteredPerfumes =
    category === "todos"
      ? perfumes
      : category === "masculinos"
      ? perfumes.filter((p) => p.genero === "masculino")
      : category === "femeninos"
      ? perfumes.filter((p) => p.genero === "femenino")
      : category === "marcas"
      ? perfumes.filter((p) => p.marca) // Ajustá si querés agrupar marcas
      : perfumes;

  const isCarousel =
    category === "marcas" || category === "masculinos" || category === "femeninos";

  // Función para scroll horizontal con flechas
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = 260; // Ancho tarjeta + margen

    if (direction === "left") {
      scrollRef.current.scrollTo({
        left: scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    } else {
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isCarousel) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          width: "100%",
          maxWidth: 960,
          mx: "auto",
        }}
      >
        <IconButton
          aria-label="scroll left"
          onClick={() => scroll("left")}
          sx={{ flexShrink: 0 }}
        >
          <ChevronLeftIcon />
        </IconButton>

        <Box
          ref={scrollRef}
          sx={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            width: "100%",
            scrollbarWidth: "thin",
            scrollbarColor: "#bbb transparent",
            "&::-webkit-scrollbar": { height: 8 },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#bbb",
              borderRadius: 4,
            },
          }}
          tabIndex={0} // para accesibilidad
          role="region"
          aria-label="Lista de perfumes en carrusel"
        >
          {filteredPerfumes.map((perfume) => (
            <Card
              key={perfume.id}
              sx={{
                display: "inline-block",
                verticalAlign: "top",
                width: 240,
                mr: 2,
                mb: 2,
              }}
            >
              <CardMedia
                component="img"
                image={perfume.imagen}
                alt={perfume.nombre}
                loading="lazy"
                sx={{
                  width: "100%",
                  height: 220,
                  objectFit: "contain",
                  backgroundColor: "#f4f4f4",
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {perfume.nombre}
                </Typography>
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

        <IconButton
          aria-label="scroll right"
          onClick={() => scroll("right")}
          sx={{ flexShrink: 0 }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    );
  }

  // Vista grid normal para "todos"
  return (
    <Grid container spacing={2} sx={{ maxWidth: 1280, mx: "auto", px: 2 }}>
      {filteredPerfumes.map((perfume) => (
        <Grid
          key={perfume.id}
          item
          xs={12}
          sm={6}
          md={4}
          sx={{ display: "flex" }}
        >
          <Card sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              height="220"
              image={perfume.imagen}
              alt={perfume.nombre}
              loading="lazy"
              sx={{ objectFit: "contain", background: "#f4f4f4" }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                {perfume.nombre}
              </Typography>
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
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
