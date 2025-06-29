import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";
import perfumes from "../data/perfumes";

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,       // 3 imágenes escritorio
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,   // tablets y menos
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,    // móviles
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <Box sx={{ mb: 4, width: "100%" }}>
      <Slider {...settings}>
        {perfumes.slice(0, 10).map((perfume) => (
          <Box key={perfume.id} sx={{ px: 1 }}>
            <img
              src={perfume.imagen}
              alt={perfume.nombre}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 8,
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
