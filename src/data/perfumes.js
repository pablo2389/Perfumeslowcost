const perfumes = [];

// Masculinos como antes
for (let i = 1; i <= 85; i++) {
  perfumes.push({
    id: i,
    nombre: `Perfume Masculino #${i}`,
    descripcion: `Descripción del perfume masculino número ${i}.`,
    precio: 20000,
    genero: "masculino",
    imagen: `/galeria/Male/img-${i}male.png`,
  });
}

// Femeninos, saltando el 1 y 102
for (let i = 1; i <= 123; i++) {
  // Omitir id femenino 1 y 102
  if (i === 1 || i === 102) continue;
  
  perfumes.push({
    id: 1000 + i,
    nombre: `Perfume Femenino #${i}`,
    descripcion: `Descripción del perfume femenino número ${i}.`,
    precio: 20000,
    genero: "femenino",
    imagen: `/galeria/Female/perfume-female-${i}.png`,
  });
}

export default perfumes;
