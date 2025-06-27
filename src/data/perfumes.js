const perfumes = [];

// Masculinos
for (let i = 1; i <= 85; i++) {
  perfumes.push({
    id: i,
    nombre: `Perfume Masculino #${i}`,
    descripcion: `Descripción del perfume masculino número ${i}.`,
    precio: 20000,
    genero: "masculino",
    imagen: `/galeria/Male/img-${i}male.webp`,
  });
}

// Femeninos — omitimos IDs con imágenes faltantes
const omitidosFemeninos = [1, 60, 102];

for (let i = 1; i <= 123; i++) {
  if (omitidosFemeninos.includes(i)) continue;

  perfumes.push({
    id: 1000 + i,
    nombre: `Perfume Femenino #${i}`,
    descripcion: `Descripción del perfume femenino número ${i}.`,
    precio: 20000,
    genero: "femenino",
    imagen: `/galeria/Female/perfume-female-${i}.webp`,
  });
}

export default perfumes;
