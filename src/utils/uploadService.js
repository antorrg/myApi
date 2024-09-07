
import { storage } from '../firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadImageToFirebase = async (file) => {
  try {
    // Crear una referencia de almacenamiento con el nombre del archivo
    const storageRef = ref(storage, `images/${file.originalname}`);

    // Subir el archivo a Firebase Storage
    await uploadBytes(storageRef, file.buffer);

    // Obtener la URL de descarga
    const downloadURL = await getDownloadURL(storageRef);
    console.log('aca etoy: ',downloadURL)

    return downloadURL;
  } catch (error) {
    console.error('Error al subir la imagen a Firebase:', error);
    throw error;
  }
};
