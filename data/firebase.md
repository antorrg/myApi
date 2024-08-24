Para capturar la URL del archivo subido y guardarla en tu base de datos, necesitas obtener la URL del archivo desde Firebase Storage después de subirlo. Aquí te muestro cómo hacer esto:

1. **Actualizar la función `uploadImage`:**
   Modifica la función `uploadImage` para obtener la URL de descarga del archivo subido.

   ```javascript
   import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

   const storage = getStorage(app);

   export const uploadImage = async (file) => {
     const storageRef = ref(storage, `images/${file.originalname}`);
     const snapshot = await uploadBytes(storageRef, file.buffer);
     const downloadURL = await getDownloadURL(snapshot.ref);
     return { metadata: snapshot.metadata, downloadURL };
   };
   ```

2. **Actualizar la ruta en tu servidor Express:**
   Modifica la ruta para capturar y devolver la URL del archivo subido.

   ```javascript
   import express from 'express';
   import multer from 'multer';
   import { uploadImage } from './firebase.js';

   const upload = multer({ storage: multer.memoryStorage() });
   const router = express.Router();

   router.post('/upload', upload.single('image'), async (req, res) => {
     try {
       const { metadata, downloadURL } = await uploadImage(req.file);
       // Aquí puedes guardar downloadURL en tu base de datos
       // Ejemplo:
       // await saveImageUrlToDatabase(downloadURL);
       res.status(200).send(`File uploaded successfully: ${metadata.name}, URL: ${downloadURL}`);
     } catch (error) {
       res.status(500).send('Error uploading file: ' + error.message);
     }
   });

   export default router;
   ```

3. **Función para guardar la URL en tu base de datos:**
   Implementa una función para guardar la URL en tu base de datos. Aquí te dejo un ejemplo usando un esquema ficticio de Mongoose.

   ```javascript
   import mongoose from 'mongoose';

   const imageSchema = new mongoose.Schema({
     url: String,
     createdAt: {
       type: Date,
       default: Date.now
     }
   });

   const Image = mongoose.model('Image', imageSchema);

   export const saveImageUrlToDatabase = async (url) => {
     const image = new Image({ url });
     await image.save();
   };
   ```

4. **Asegúrate de conectar tu base de datos en `app.js`:**

   ```javascript
   import express from 'express';
   import dotenv from 'dotenv';
   import mongoose from 'mongoose';
   import uploadRouter from './upload.js'; // Asegúrate de que la ruta sea correcta

   dotenv.config();

   mongoose.connect(process.env.MONGODB_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });

   const app = express();

   // Middleware y configuración de vistas
   app.set('view engine', 'pug');
   app.set('views', './views');

   app.use(express.urlencoded({ extended: true }));
   app.use('/upload', uploadRouter);

   // Rutas y otras configuraciones
   app.get('/', (req, res) => {
     res.render('index');
   });

   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

5. **Actualizar la vista en Pug:**
   La vista en Pug sigue igual para permitir la subida de archivos.

   ```pug
   //- views/index.pug
   doctype html
   html
     head
       title Subir Imagen
     body
       h1 Subir Imagen a Firebase
       form(action="/upload" method="POST" enctype="multipart/form-data")
         input(type="file" name="image")
         button(type="submit") Subir
   ```

Con estos cambios, después de subir una imagen, la URL de la imagen se obtendrá de Firebase Storage y se guardará en tu base de datos. Puedes ajustar la lógica de almacenamiento según la base de datos que estés utilizando.