
document.addEventListener('DOMContentLoaded', () => {
    const fileLogo = document.getElementById('fileLogo');
    const fileLanding = document.getElementById('fileLanding');
    const previewButton1 = document.getElementById('previewButton1');
    const cancelButton1 = document.getElementById('cancelButton1');
    const previewButton2 = document.getElementById('previewButton2');
    const cancelButton2 = document.getElementById('cancelButton2');
    const logoPreview = document.getElementById('logoPreview');
    const landingPreview = document.getElementById('landingPreview')
    const updateForm = document.getElementById('updateForm');
    const submitButton = document.getElementById('submitButton');
  
    // Mostrar la vista previa de la imagen seleccionada
    previewButton1.addEventListener('click', () => {
      if (fileLogo.files && fileLogo.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          logoPreview.src = e.target.result;
          logoPreview.style.display = 'block';
        };
        reader.readAsDataURL(fileLogo.files[0]);
      }
    });
    previewButton2.addEventListener('click', () => {
        if (fileLanding.files && fileLanding.files[0]) {
          const reader = new FileReader();
          reader.onload = (e) => {
            landingPreview.src = e.target.result;
            landingPreview.style.display = 'block';
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
  // Funcion de sweetalert2
      submitButton.addEventListener('click', () => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
          title: "Seguro quiere actualizar?",
          text: "Puede cancelar si lo desea!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si, actualizar!",
          cancelButtonText: "Cancelar!",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            handleSubmit()
            swalWithBootstrapButtons.fire({
              title: "Actualizado!",
              text: "El proyecto ha sido actualizado.",
              icon: "success"
            });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelado",
              text: "La actualizacion se revirtió",
              icon: "error"
            });
          }
        });
      })
    // Manejo del envío del formulario
    // submitButton.addEventListener('click', async (e) => {
    //   e.preventDefault();
    const handleSubmit = async()=>{
      const formData = new FormData(updateForm); // Captura todos los campos del formulario
       // Consologuear el contenido de FormData
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }
      const token = localStorage.getItem('token'); 
  
      try {
        const id = document.getElementById('id').value;
        console.log('soy el id: ', id)
        const response = await fetch(`/api/v3/page/${id}`, {
          method: 'PUT',
          body: formData, // Envía el FormData con el archivo y otros datos
          headers: {
            'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado
          },
        });
    
        if (response.ok) {
  
          // Recargar la página después de 2 segundos
          setTimeout(() => {
            window.location.reload();
          }, 2000);
      
        }
      } catch (error) {
         document.querySelector('#updateForm').innerHTML = `
          <div class="modalContainer">
          <div class="modalSuccess">
          <h1>Error:</h1>
          <h2>{error.message}</h2>
          </div>
          </div>
        `;
  
        setTimeout(() => {
          window.location.reload();
        }, 8000);
      }
    };
  });
  