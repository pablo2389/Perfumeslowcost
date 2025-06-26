import React from "react";
import { Tabs, Tab } from "@mui/material";

const tabs = ["todos", "masculinos", "femeninos", "about", "testimonios"];

const Navbar = ({ category, setCategory, showAbout, setShowAbout, showTestimonials, setShowTestimonials }) => {
  const handleChange = (event, newValue) => {
    if (newValue === "about") {
      setShowAbout(true);
      setShowTestimonials(false);
      setCategory(null);
    } else if (newValue === "testimonios") {
      setShowTestimonials(true);
      setShowAbout(false);
      setCategory(null);
    } else {
      setCategory(newValue);
      setShowAbout(false);
      setShowTestimonials(false);
    }
  };

  return (
    <Tabs
      value={showAbout ? "about" : showTestimonials ? "testimonios" : category}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      sx={{ marginBottom: 3 }}
    >
      {tabs.map((tab) => (
        <Tab key={tab} label={tab.toUpperCase()} value={tab} />
      ))}
    </Tabs>
  );
};

export default Navbar;
