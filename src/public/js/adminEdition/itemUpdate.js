document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const previewButton = document.getElementById('previewButton');
  const cancelButton = document.getElementById('cancelButton');
  const preview = document.getElementById('preview');
  const img = document.getElementById('imageURL');
  const updateForm = document.getElementById('updateForm');
  const submitButton = document.getElementById('submitButton');

  // Mostrar la vista previa de la imagen seleccionada
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

  // Cancelar la selección de la imagen y ocultar la vista previa
  cancelButton.addEventListener('click', () => {
    fileInput.value = '';
    preview.src = '';
    preview.style.display = 'none';
    img.value = ''; // Borra la URL de la imagen anterior si se cancela
  });

  // Manejo del envío del formulario
  submitButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const formData = new FormData(updateForm); // Captura todos los campos del formulario
    // Agregar archivo si existe uno nuevo
    // if (fileInput.files && fileInput.files[0]) {
    //   formData.append('image', fileInput.files[0]);
    // }

     // Consologuear el contenido de FormData
  // for (const [key, value] of formData.entries()) {
  //   console.log(`${key}:`, value);
  // }

    try {
      const itemId = document.getElementById('itemId').value;
      const response = await fetch(`/api/v3/page/${itemId}`, {
        method: 'PATCH',
        body: formData, // Envía el FormData con el archivo y otros datos
      });
  
      if (response.ok) {
        document.querySelector('#updateForm').innerHTML = `
          <div class="alert alert-success" role="alert" style="text-align: center; margin: 20px auto; border: 2px solid #28a745; max-width: 400px; padding: 20px;">
            <h2>Actualización exitosa</h2>
          </div>
        `;

        // Recargar la página después de 2 segundos
        setTimeout(() => {
          window.location.reload();
        }, 2000);
    
      } else {
        document.querySelector('#updateForm').innerHTML = `
          <div class="alert alert-danger" role="alert" style="text-align: center; margin: 20px auto; border: 2px solid #8d281e; max-width: 400px; padding: 20px;">
            <h1>Error ${response.status}</h1>
            <h2>${response.statusText}</h2>
            <strong>Por favor intente de nuevo</strong>
          </div>
        `;
  
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      document.querySelector('#updateForm').innerHTML = `
        <div class="alert alert-danger" role="alert" style="text-align: center; margin: 20px auto; border: 2px solid #8d281e; max-width: 400px; padding: 20px;" >
          <h1>Error</h1>
          <h2>${error.message}</h2>
          <strong>Por favor intente de nuevo</strong>
        </div>
      `;

      setTimeout(() => {
        window.location.reload();
      }, 8000);
    }
  });
});
