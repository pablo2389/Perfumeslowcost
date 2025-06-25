import React, { useState } from "react";
import { CssBaseline, Box } from "@mui/material";

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
          px: 2,
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
              gap: 3,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box sx={{ flex: 3 }}>
              <ProductGrid
                category={category}
                cart={cart}
                setCart={setCart}
                fullView={category === "todos"}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 300 }}>
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
