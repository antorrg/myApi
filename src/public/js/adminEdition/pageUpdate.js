
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
  
   
  
  // Funcion de sweetalert2
      submitButton.addEventListener('click', (e) => {
        e.preventDefault();
          // Recoger todos los campos que deben ser validados
  const title = document.getElementById('title').value.trim();
  const info_header = document.getElementById('info_header').value.trim();
  const info_body = document.getElementById('info_body').value.trim();
  const url = document.getElementById('url').value.trim();
  const enable = document.getElementById('enable').value;
  
  // Validar que no estén vacíos
  if (!title || !info_header || !info_body || !url || !enable) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Por favor rellene todos los campos",
      showConfirmButton: false,
      timer: 1500
    });
    return;
       }
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
    //   e.preventDefault();
    const handleSubmit = async()=>{
     
    const pageData = {
                       title: document.getElementById('title').value,
                       logo: document.getElementById('logoUrl').value,
                       landing: document.getElementById('landingUrl').value,
                       info_header: document.getElementById('info_header').value,
                       info_body: document.getElementById('info_body').value,
                       url : document.getElementById('url').value,
                       enable: document.getElementById('enable').value,
                     }
    
                  
      const token = localStorage.getItem('token'); 
  
      try {
        const id = document.getElementById('id').value;
        console.log('soy el id: ', id)
        console.log(pageData)
        const response = await fetch(`/api/v3/page/${id}`, {
          method: 'PUT',
          body: JSON.stringify(pageData), 
          headers: {
            'Content-Type': 'application/json',
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
  