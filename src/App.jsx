import { Box, CssBaseline, Typography, Button, Drawer, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet";

import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import ShippingCalculator from "./components/ShippingCalculator";
import WhatsAppCheckout from "./components/WhatsAppCheckout";
import AboutUs from "./components/AboutUs";
import Testimonials from "./components/Testimonials";

const App = () => {
  const [category, setCategory] = useState("todos");
  const [cart, setCart] = useState([]);
  const [showAbout, setShowAbout] = useState(false);
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <>
      <Helmet>
        <title>Perfumes Low Cost en Mendoza</title>
      </Helmet>

      <CssBaseline />
      <Navbar
        category={category}
        setCategory={setCategory}
        showAbout={showAbout}
        setShowAbout={setShowAbout}
        showTestimonials={showTestimonials}
        setShowTestimonials={setShowTestimonials}
      />

      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 1, sm: 2, md: 3 },
          py: 4,
          width: "100%",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.6rem", sm: "2.4rem", md: "3rem" },
              textAlign: "center",
              lineHeight: 1.2,
              maxWidth: 600,
              margin: "0 auto",
              whiteSpace: "normal",
              wordBreak: "break-word",
            }}
          >
            PERFUMES<br />DE BAJO COSTO
          </Typography>
        </Box>

        {showAbout && <AboutUs />}
        {showTestimonials && <Testimonials />}

        {!showAbout && !showTestimonials && (
          <>
            {/* Botón flotante para ver el carrito en móvil */}
            {isMobile && (
              <Button
                variant="contained"
                color="success"
                sx={{
                  position: "fixed",
                  bottom: 24,
                  right: 24,
                  zIndex: 2000,
                  borderRadius: "50%",
                  minWidth: 56,
                  minHeight: 56,
                  width: 56,
                  height: 56,
                  boxShadow: 4,
                  display: cart.length > 0 ? "flex" : "none",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  p: 0,
                }}
                onClick={() => setCartOpen(true)}
                aria-label="Ver carrito"
              >
                🛒
              </Button>
            )}

            <Box
              sx={{
                display: { xs: "block", md: "flex" },
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  minWidth: 0,
                  minHeight: { md: 800 },
                }}
              >
                <ProductGrid
                  category={category}
                  cart={cart}
                  setCart={setCart}
                  setCartOpen={setCartOpen}
                />
              </Box>

              {/* Carrito lateral solo visible en escritorio */}
              {!isMobile && (
                <Box
                  sx={{
                    flexShrink: 0,
                    width: { xs: "100%", md: 300 },
                    position: { md: "sticky" },
                    top: { md: 140 },
                    mt: { xs: 4, md: 0 },
                    zIndex: 1,
                  }}
                >
                  <WhatsAppCheckout cart={cart} setCart={setCart} />
                  <ShippingCalculator />
                </Box>
              )}
            </Box>
          </>
        )}
      </Box>

      {/* Drawer flotante para el carrito en móvil/tablet */}
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        sx={{ zIndex: 3000 }}
      >
        <Box sx={{ width: { xs: 280, sm: 350 }, p: 2, maxWidth: "100vw" }}>
          <WhatsAppCheckout cart={cart} setCart={setCart} />
          <ShippingCalculator />
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setCartOpen(false)}
          >
            Cerrar
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default App;