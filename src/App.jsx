import React, { useState } from "react";
import { CssBaseline, Box, Typography } from "@mui/material";
import { Helmet } from "react-helmet";

import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import WhatsAppCheckout from "./components/WhatsAppCheckout";
import AboutUs from "./components/AboutUs";
import Testimonials from "./components/Testimonials";
import ShippingCalculator from "./components/ShippingCalculator";

const App = () => {
  const [category, setCategory] = useState("todos");
  const [cart, setCart] = useState([]);
  const [showAbout, setShowAbout] = useState(false);
  const [showTestimonials, setShowTestimonials] = useState(false);

  return (
    <>
      <Helmet>
        <title>Perfumes Low Cost en Mendoza - Envíos a Guaymallén y más</title>
        <meta
          name="description"
          content="Compra perfumes originales en Mendoza con envíos rápidos a Guaymallén, Las Heras, Godoy Cruz, Luján y Maipú. Calidad y precio justo."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://perfumeslowcost.netlify.app" />
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
          margin: "0 auto",
          px: { xs: 1, sm: 2, md: 3 },
          py: 4,
          width: "100%",
        }}
      >
        {showAbout && <AboutUs />}
        {showTestimonials && <Testimonials />}
        {!showAbout && !showTestimonials && (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 2, md: 3 },
            }}
          >
            <Box sx={{ flex: 3 }}>
              <Typography
                variant="h3"
                component="h1"
                align="center"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  mb: { xs: 3, md: 4 },
                  fontSize: { xs: "2rem", sm: "2.8rem", md: "3rem" },
                }}
              >
                PERFUMESLOWCOST
              </Typography>

              <ProductGrid
                category={category}
                cart={cart}
                setCart={setCart}
                fullView={category === "todos"}
              />
            </Box>

            <Box
              sx={{
                flex: 1,
                minWidth: 280,
                mt: { xs: 3, md: 0 },
                px: { xs: 0, md: 2 },
              }}
            >
              <WhatsAppCheckout cart={cart} setCart={setCart} />
              <ShippingCalculator />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default App;
