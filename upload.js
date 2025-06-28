
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// Configura tus credenciales Cloudinary
cloudinary.config({
  cloud_name: "dmzcooy2q",
  api_key: "811846958872457",
  api_secret: "TKSHTMBX5ztsF-StrVbLjIKmvb0",
});

const baseGaleria = path.resolve("./public/galeria");
const carpetaFemale = path.join(baseGaleria, "female");
const carpetaMale = path.join(baseGaleria, "male");

console.log("Leyendo imágenes femeninas desde:", carpetaFemale);
console.log("Leyendo imágenes masculinas desde:", carpetaMale);

function limpiarNombre(nombre) {
  // Quita extensión
  let limpio = nombre.replace(/\.[^/.]+$/, "");
  // Elimina TODOS los caracteres de control ASCII, espacios, tabs, saltos de línea
  limpio = limpio.replace(/[\x00-\x1F\x7F\s]+/g, "");
  // Quita caracteres que no sean letras, números, guion o guion bajo
  limpio = limpio.replace(/[^\w\-]+/g, "");
  return limpio.toLowerCase();
}

async function subirImagenes() {
  const archivosFemale = fs.existsSync(carpetaFemale) ? fs.readdirSync(carpetaFemale) : [];
  const archivosMale = fs.existsSync(carpetaMale) ? fs.readdirSync(carpetaMale) : [];

  // Subir femeninos
  for (const archivo of archivosFemale) {
    const fullPath = path.join(carpetaFemale, archivo);
    const nombreLimpio = limpiarNombre(archivo);
    const tienePrefijo = nombreLimpio.startsWith("perfume-female");
    const numero = nombreLimpio.match(/\d+/);
    const publicId = tienePrefijo
      ? nombreLimpio
      : numero
      ? `perfume-female-${numero[0]}`
      : `perfume-female-${nombreLimpio}`;

    console.log(`Archivo (female): "${archivo}"`);
    console.log(`Public ID (female): "${publicId}"`);

    try {
      const resultado = await cloudinary.uploader.upload(fullPath, {
        public_id: publicId,
        overwrite: true,
        resource_type: "image",
      });
      console.log(`Subido (female): "${resultado.public_id}"`);
    } catch (error) {
      console.error(`Error subiendo ${archivo} (female):`, error);
    }
  }

  // Subir masculinos
  for (const archivo of archivosMale) {
    const fullPath = path.join(carpetaMale, archivo);
    const nombreLimpio = limpiarNombre(archivo);
    const tienePrefijo =
      nombreLimpio.startsWith("img") && nombreLimpio.endsWith("male");
    const numero = nombreLimpio.match(/\d+/);
    const publicId = tienePrefijo
      ? nombreLimpio
      : numero
      ? `img-${numero[0]}male`
      : `img-${nombreLimpio}male`;

    console.log(`Archivo (male): "${archivo}"`);
    console.log(`Public ID (male): "${publicId}"`);

    try {
      const resultado = await cloudinary.uploader.upload(fullPath, {
        public_id: publicId,
        overwrite: true,
        resource_type: "image",
      });
      console.log(`Subido (male): "${resultado.public_id}"`);
    } catch (error) {
      console.error(`Error subiendo ${archivo} (male):`, error);
    }
  }
}

subirImagenes();
