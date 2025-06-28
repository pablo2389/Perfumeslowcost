const perfumes = [
  // Masculinos
  ...Array.from({ length: 85 }, (_, i) => {
    const index = i + 1;
    return {
      id: index,
      nombre: `Perfume Masculino #${index}`,
      descripcion: `Descripción del perfume masculino número ${index}.`,
      precio: 20000,
      genero: "masculino",
      imagen: `https://res.cloudinary.com/dmzcooy2q/image/upload/v1751081571/img-${index}male.webp`,
    };
  }),

  // Femeninos (omitidos 122 y 123)
  ...Array.from({ length: 123 }, (_, i) => {
    const index = i + 1;
    if ([122, 123].includes(index)) return null; // omitir estos
    return {
      id: 1000 + index,
      nombre: `Perfume Femenino #${index}`,
      descripcion: `Descripción del perfume femenino número ${index}.`,
      precio: 20000,
      genero: "femenino",
      imagen: `https://res.cloudinary.com/dmzcooy2q/image/upload/v1751081558/perfume-female-${index}.webp`,
    };
  }).filter(Boolean), // elimina los nulls
];

export default perfumes;
