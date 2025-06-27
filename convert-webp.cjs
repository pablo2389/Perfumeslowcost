const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const carpetas = ['Male', 'Female'];
const basePath = path.join(__dirname, 'public', 'galeria');

async function convertirImagenes() {
  for (const carpeta of carpetas) {
    const folderPath = path.join(basePath, carpeta);
    if (!fs.existsSync(folderPath)) {
      console.warn(`La carpeta ${carpeta} no existe, se saltea`);
      continue;
    }
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      const nombreSinExt = path.basename(file, ext);
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        const inputPath = path.join(folderPath, file);
        const outputPath = path.join(folderPath, nombreSinExt + '.webp');

        // Si ya existe el archivo webp, podés comentar esta línea para evitar sobreescribir
        if (fs.existsSync(outputPath)) {
          console.log(`Ya existe: ${outputPath}, saltando`);
          continue;
        }

        try {
          await sharp(inputPath)
            .webp({ quality: 80 }) // calidad ajustable
            .toFile(outputPath);
          console.log(`Convertido: ${file} → ${nombreSinExt}.webp`);
        } catch (err) {
          console.error(`Error al convertir ${file}:`, err);
        }
      }
    }
  }
  console.log('Conversión terminada');
}

convertirImagenes();
