import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const MobileMenu = ({
  category,
  setCategory,
  showAbout,
  setShowAbout,
  showTestimonials,
  setShowTestimonials,
  tabs,
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = (tab) => {
    if (tab === "about") {
      setShowAbout(true);
      setShowTestimonials(false);
      setCategory("todos");
    } else if (tab === "testimonios") {
      setShowTestimonials(true);
      setShowAbout(false);
      setCategory("todos");
    } else {
      setCategory(tab);
      setShowAbout(false);
      setShowTestimonials(false);
    }
    setOpen(false); // Cierra el menú al seleccionar
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", px: 1 }}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setOpen(true)}
        sx={{ mr: 1 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {category ? category.toUpperCase() : "PERFUMES"}
      </Typography>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Menú
          </Typography>
          <List sx={{ width: 220 }}>
            {tabs.map((tab) => (
              <ListItem key={tab} disablePadding>
                <ListItemButton onClick={() => handleClick(tab)}>
                  <ListItemText primary={tab.toUpperCase()} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MobileMenu;