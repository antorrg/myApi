import multer from 'multer';

// Configuración de Multer para almacenamiento temporal
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware para manejar la subida de archivos
export const uploadMiddleware = upload.single('image');

export const uploadUpdPage = upload.fields([
    { name: 'fileLogo', maxCount: 1 }, 
    { name: 'fileLanding', maxCount: 1 }
  ]);

  export const uploadCreatePage = upload.fields([
    { name: 'fileLogo', maxCount: 1 }, 
    { name: 'fileLanding', maxCount: 1 },
   // { name: 'items[0][image]', maxCount: 1 },
    // { name: 'items[1][image]', maxCount: 1 },
    // { name: 'items[2][image]', maxCount: 1 },
    // { name: 'items[3][image]', maxCount: 1 },
    // { name: 'items[4][image]', maxCount: 1 },
    // { name: 'items[5][image]', maxCount: 1 }
  ]);
  