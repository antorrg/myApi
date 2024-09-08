
document.addEventListener('DOMContentLoaded', () => {
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
            handleSubmit().then(response => {
              //console.log('soy la response: ', response)
              if (response.status===200) {
                swalWithBootstrapButtons.fire({
                  title: "Actualizado!",
                  text: "El proyecto ha sido actualizado.",
                  icon: "success"
                });
           
              } else {
                // Manejar otros estados si es necesario
                swalWithBootstrapButtons.fire({
                  title: "Error",
                  text: "Hubo un problema al actualizar el proyecto.",
                  icon: "error"
                });
              }
            }).catch(error => {
              console.log('soy el error: ',error)
              // Manejar errores en la solicitud
              swalWithBootstrapButtons.fire({
                title: "Error",
                text: "No se pudo actualizar el proyecto.",
                icon: "error"
              });
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
        //console.log('soy el id: ', id)
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
          return response;
        }else {
          document.querySelector('#createPageForm').innerHTML = `
            <div class="alert alert-danger" role="alert" style="text-align: center; margin: 20px auto; border: 2px solid #8d281e; max-width: 400px; padding: 20px;">
              <h1>Error ${response.status}</h1>
              <h2>${response.statusText}</h2>
              <strong>Por favor intente de nuevo</strong>
            </div>
          `;
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          return response;
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
        throw error;
      }
    };
  });
  