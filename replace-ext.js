import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cambiá esta ruta por donde tengas tus archivos de código
const codePath = path.join(__dirname);


function reemplazarExtensiones(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      reemplazarExtensiones(fullPath);
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // Reemplazar .png y .jpg por .webp en las rutas
      const nuevoContent = content.replace(/\.png/g, '.webp').replace(/\.jpg/g, '.webp');

      if (content !== nuevoContent) {
        fs.writeFileSync(fullPath, nuevoContent, 'utf8');
        console.log(`Modificado: ${fullPath}`);
      }
    }
  });
}

reemplazarExtensiones(codePath);
console.log('Reemplazo completado');
