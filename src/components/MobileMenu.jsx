import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const MobileMenu = ({
  category,
  setCategory,
  showAbout,
  setShowAbout,
  showTestimonials,
  setShowTestimonials,
  tabs
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = (tab) => {
    if (tab === "about") {
      setShowAbout(true);
      setShowTestimonials(false);
      setCategory(null);
    } else if (tab === "testimonios") {
      setShowTestimonials(true);
      setShowAbout(false);
      setCategory(null);
    } else {
      setCategory(tab);
      setShowAbout(false);
      setShowTestimonials(false);
    }
    setOpen(false); // Cierra el menú al seleccionar
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 250 }}>
          {tabs.map((tab) => (
            <ListItem key={tab} disablePadding>
              <ListItemButton onClick={() => handleClick(tab)}>
                <ListItemText primary={tab.toUpperCase()} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default MobileMenu;
