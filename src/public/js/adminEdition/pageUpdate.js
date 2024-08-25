
document.addEventListener('DOMContentLoaded', () => {
    const fileLogo = document.getElementById('fileInput');
    const fileLanding = document.getElementById('fileInput');
    const previewButton1 = document.getElementById('previewButton1');
    const cancelButton1 = document.getElementById('cancelButton1');
    const previewButton2 = document.getElementById('previewButton2');
    const cancelButton2 = document.getElementById('cancelButton2');
    const preview = document.getElementById('preview');
    const img = document.getElementById('imageURL');
    const updateForm = document.getElementById('updateForm');
    const submitButton = document.getElementById('submitButton');
  
    // Mostrar la vista previa de la imagen seleccionada
    previewButton1.addEventListener('click', () => {
      if (fileLogo.files && fileLogo.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          preview.src = e.target.result;
          preview.style.display = 'block';
        };
        reader.readAsDataURL(fileLogo.files[0]);
      }
    });
    previewButton2.addEventListener('click', () => {
        if (fileLanding.files && fileLanding.files[0]) {
          const reader = new FileReader();
          reader.onload = (e) => {
            preview.src = e.target.result;
            preview.style.display = 'block';
          };
          reader.readAsDataURL(fileLanding.files[0]);
        }
      });
  
    // Cancelar la selección de la imagen y ocultar la vista previa
    cancelButton1.addEventListener('click', () => {
      fileLogo.value = '';
      preview.src = '';
      preview.style.display = 'none';
      logo.value = ''; // Borra la URL de la imagen anterior si se cancela
    });
    cancelButton2.addEventListener('click', () => {
        fileLanding.value = '';
        preview.src = '';
        preview.style.display = 'none';
        landing.value = ''; // Borra la URL de la imagen anterior si se cancela
      });
  
    // Manejo del envío del formulario
    submitButton.addEventListener('click', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(updateForm); // Captura todos los campos del formulario
      
 
       // Consologuear el contenido de FormData
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
      const token = localStorage.getItem('token'); 
  
      try {
        const pageId = document.getElementById('pageId').value;
        console.log('soy el id: ', pageId)
        // const response = await fetch(`/api/v3/page/${pageId}`, {
        //   method: 'PUT',
        //   body: formData, // Envía el FormData con el archivo y otros datos
        //   headers: {
        //     'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado
        //   },
        // });
    
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
          }, 20000);
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
        }, 80000);
      }
    });
  });
  