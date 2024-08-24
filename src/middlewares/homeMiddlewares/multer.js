import multer from 'multer';
import fs from 'node:fs'

// Configuración de Multer para almacenamiento temporal
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware para manejar la subida de archivos
export const uploadMiddleware = upload.single('image');

// export const upload2 = multer({dest: 'uploads/'})

// export const saveImage =(file)=>{
//    const newPath = `./uploads/${file.originalname}`
//    fs.renameSync(file.path, newPath)
//    return newPath
// }
