import React from "react";
import { Tabs, Tab, Box, useMediaQuery } from "@mui/material";
import MobileMenu from "./MobileMenu";

const tabs = ["todos", "masculinos", "femeninos", "about", "testimonios"];

const Navbar = ({
  category,
  setCategory,
  showAbout,
  setShowAbout,
  showTestimonials,
  setShowTestimonials,
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleChange = (event, newValue) => {
    if (newValue === "about") {
      setShowAbout(true);
      setShowTestimonials(false);
      setCategory("todos");
    } else if (newValue === "testimonios") {
      setShowTestimonials(true);
      setShowAbout(false);
      setCategory("todos");
    } else {
      setCategory(newValue);
      setShowAbout(false);
      setShowTestimonials(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        boxShadow: 2,
        borderRadius: 2,
        mb: 3,
        overflowX: "auto",
      }}
    >
      {isMobile ? (
        <MobileMenu
          category={category}
          setCategory={setCategory}
          showAbout={showAbout}
          setShowAbout={setShowAbout}
          showTestimonials={showTestimonials}
          setShowTestimonials={setShowTestimonials}
          tabs={tabs}
        />
      ) : (
        <Tabs
          value={showAbout ? "about" : showTestimonials ? "testimonios" : category || "todos"}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="Categorías de perfumes"
          sx={{
            minHeight: "48px",
            px: { xs: 1, sm: 2 },
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab}
              label={tab.toUpperCase()}
              value={tab}
              sx={{
                minWidth: 100,
                fontWeight: "bold",
                fontSize: { xs: "0.7rem", sm: "0.9rem", md: "1rem" },
              }}
            />
          ))}
        </Tabs>
      )}
    </Box>
  );
};

export default Navbar;