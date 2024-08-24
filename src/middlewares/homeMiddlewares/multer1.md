Lo ideal es manejar la carga del archivo a Firebase en el servicio (service) de tu aplicación. Esto mantiene la responsabilidad de cada capa clara y facilita la escalabilidad y el mantenimiento del código. 

### Flujo recomendado:

1. **Middleware de Multer**: En el middleware de Multer, procesas la subida del archivo desde el formulario. Aquí simplemente preparas el archivo para ser subido, pero no realizas la carga a Firebase.

2. **Controller**: El controlador recibe la solicitud y llama al servicio para manejar la lógica de negocio. Esto incluye la llamada al servicio para subir el archivo a Firebase.

3. **Service**: En el servicio, manejas la subida del archivo a Firebase utilizando el SDK de Firebase Admin. Una vez subida la imagen, obtienes la URL pública y la devuelves al controlador.

4. **Controller (continuación)**: Una vez que el controlador recibe la URL de la imagen desde el servicio, puede proceder a guardar esta URL en la base de datos junto con otros datos del formulario.

5. **Response**: Finalmente, el controlador envía la respuesta al cliente con la confirmación de que el proceso fue exitoso.

### Ejemplo de implementación

#### Middleware de Multer:

```javascript
const multer = require('multer');
const storage = multer.memoryStorage(); // Almacenamiento en memoria
const upload = multer({ storage: storage });

module.exports = upload.single('image'); // Asumiendo que el campo del archivo se llama 'image'
```

#### Controller:

```javascript
const { uploadImageService, updateItemService } = require('../services/itemService');

async function updateItemController(req, res) {
  try {
    // Llama al servicio para subir la imagen a Firebase y obtener la URL
    let imageUrl = req.body.img; // URL existente por defecto
    if (req.file) {
      imageUrl = await uploadImageService(req.file); // Subir nueva imagen y obtener la URL
    }

    // Crear los datos a actualizar
    const updatedData = {
      text: req.body.text,
      enable: req.body.enable,
      img: imageUrl,
    };

    // Llama al servicio para actualizar el ítem en la base de datos
    const updatedItem = await updateItemService(req.body.itemId, updatedData);

    return res.status(200).json(updatedItem);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el ítem', error });
  }
}

module.exports = { updateItemController };
```

#### Service:

```javascript
const { getStorage } = require('firebase-admin/storage');
const { v4: uuidv4 } = require('uuid');
const bucket = getStorage().bucket();

// Servicio para subir imagen a Firebase
async function uploadImageService(file) {
  const blob = bucket.file(`uploads/${uuidv4()}`);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', (err) => {
      reject(err);
    });

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });

    blobStream.end(file.buffer);
  });
}

// Servicio para actualizar el ítem en la base de datos
async function updateItemService(itemId, updatedData) {
  // Aquí llamas al ORM o query para actualizar el ítem en la base de datos
  return await ItemModel.update(updatedData, { where: { id: itemId } });
}

module.exports = { uploadImageService, updateItemService };
```

### Resumen:
- **Multer**: Maneja la recepción del archivo en el backend.
- **Service**: Se encarga de la lógica para subir la imagen a Firebase.
- **Controller**: Coordina las acciones entre el servicio de carga y la base de datos, garantizando que el flujo de trabajo sea manejado correctamente.

Este enfoque te da flexibilidad y mantiene el código modular, lo que facilita las pruebas y el mantenimiento a largo plazo.