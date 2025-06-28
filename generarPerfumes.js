import fs from "fs";
import path from "path";

const cloudName = "dmzcooy2q";

const getCloudinaryUrl = (publicId) =>
  `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}.webp`;

// Ruta local a las carpetas con imágenes subidas
const baseGaleria = path.resolve("./public/galeria");
const carpetaMale = path.join(baseGaleria, "male");
const carpetaFemale = path.join(baseGaleria, "female");

// Función para limpiar y formar public_id
function limpiarNombre(nombre) {
  let limpio = nombre.replace(/\.[^/.]+$/, ""); // quita extensión
  limpio = limpio.replace(/[\x00-\x1F\x7F\s]+/g, ""); // quita espacios/control
  limpio = limpio.replace(/[^\w\-]+/g, ""); // quita caracteres especiales
  return limpio.toLowerCase();
}

function crearPerfumes() {
  const perfumes = [];

  // Procesar perfumes masculinos
  const archivosMale = fs.existsSync(carpetaMale) ? fs.readdirSync(carpetaMale) : [];
  archivosMale.forEach((archivo, index) => {
    const publicId = limpiarNombre(archivo);
    perfumes.push({
      id: index + 1,
      nombre: `Perfume Masculino #${index + 1}`,
      descripcion: `Descripción del perfume masculino número ${index + 1}.`,
      precio: 20000,
      genero: "masculino",
      imagen: getCloudinaryUrl(publicId),
    });
  });

  // Procesar perfumes femeninos
  const archivosFemale = fs.existsSync(carpetaFemale) ? fs.readdirSync(carpetaFemale) : [];
  archivosFemale.forEach((archivo, index) => {
    const publicId = limpiarNombre(archivo);
    perfumes.push({
      id: 1000 + index + 1,
      nombre: `Perfume Femenino #${index + 1}`,
      descripcion: `Descripción del perfume femenino número ${index + 1}.`,
      precio: 20000,
      genero: "femenino",
      imagen: getCloudinaryUrl(publicId),
    });
  });

  return perfumes;
}

const perfumes = crearPerfumes();

const contenido = `const perfumes = ${JSON.stringify(perfumes, null, 2)};\n\nexport default perfumes;\n`;

fs.writeFileSync(path.resolve("./perfumes.js"), contenido, "utf-8");

console.log("Archivo perfumes.js generado con éxito.");
