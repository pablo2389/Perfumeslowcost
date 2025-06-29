import { Box, CssBaseline, Typography } from "@mui/material";
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
              <ProductGrid category={category} cart={cart} setCart={setCart} />
            </Box>

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
          </Box>
        )}
      </Box>
    </>
  );
};

export default App;