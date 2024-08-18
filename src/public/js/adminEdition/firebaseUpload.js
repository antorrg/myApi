//import {app} from '../../../firebase.js'
//const storage = getStorage(app);

document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const previewButton = document.getElementById('previewButton');
  const cancelButton = document.getElementById('cancelButton');
  const preview = document.getElementById('preview');
  const imgInput = document.getElementById('imageURL'); // Cambiado el nombre de la variable
  const updateForm = document.getElementById('updateForm');
  const submitButton = document.getElementById('submitButton');
 

  previewButton.addEventListener('click', () => {
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.src = e.target.result;
        preview.style.display = 'block';
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  });

  cancelButton.addEventListener('click', () => {
    fileInput.value = '';
    preview.src = '';
    preview.style.display = 'none';
    imgInput.value = ''; // Cambiado aquí
  });

  submitButton.addEventListener('click', async () => {
    let downloadURL = imgInput.value; // Usa el valor existente por defecto
    if (fileInput.files && fileInput.files[0]) {
      try {
        const file = fileInput.files[0];
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        downloadURL = await getDownloadURL(storageRef);
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        return;
      }
    }

    const formData = {
      text: document.getElementById('text').value,
      enable: document.getElementById('enable').value,
      img: downloadURL // Cambiado aquí
    };
  
    try {
      const itemId = document.getElementById('itemId').value;
      const response = await fetch(`./api/v3/page/item/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
  
      console.log('response: ', response)
      if (response.ok) {
        document.querySelector('main').innerHTML = `
        <div class="alert" role="alert" style="max-width: 500px; max-height:500px">
        <h2>Actualización exitosa</h2>
        </div>
      `;

      // Volver a mostrar el formulario después de 2 segundos
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    
        // Puedes redirigir o actualizar la página aquí si es necesario
      } else {
        document.querySelector('main').innerHTML = `
          <div class="alert alert-danger" role="alert">
          <h1>Error${response.status}</h1>
          <h2>${response.statusText}</h2>
          <strong>Por favor intente de nuevo</strong>
          </div>
        `;
  
        // Volver a mostrar el formulario después de 2 segundos
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
         document.querySelector('main').innerHTML = `
          <div class="alert alert-danger" role="alert">
          <h1>Error</h1>
          <h2>${error}</h2>
          <strong>Por favor intente de nuevo</strong>
          </div>
        `;
  
        // Volver a mostrar el formulario después de 2 segundos
        setTimeout(() => {
          window.location.reload();
        }, 8000);
    
    }
  });
});