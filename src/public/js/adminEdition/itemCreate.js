document.addEventListener('DOMContentLoaded', ()=>{

    const submitButton = document.getElementById('submitButton')
//sweetalert:------------------------------------------
    submitButton.addEventListener('click', () => {
          // Recoger todos los campos que deben ser validados
  const img = document.getElementById('itemUrl').value.trim(); 
  const text = document.getElementById('text').value.trim()
  const enable = document.getElementById('enable').value;
  
  // Validar que no estén vacíos
     if (!img|| !text || !enable) {
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
          title: "Seguro quiere crear el item?",
          text: "Puede cancelar si lo desea!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si, Crear!",
          cancelButtonText: "Cancelar!",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            const spinnerContainer = document.querySelector('.spinner-container');
            spinnerContainer.innerHTML = `
              <div><p>Aguarde...</p></div>
              <div class="spinner"</div>
              <div class="progress mt-3" style="height: 20px;">
                <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: 90%;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            `;
            spinnerContainer.style.display = 'block'; 
            handleSubmit().then(response => {
            console.log('soy la response: ', response)
            if (response.status===201) {
              swalWithBootstrapButtons.fire({
                title: "Creado!",
                text: "El item ha sido creado.",
                icon: "success"
              });
         
            } else {
              // Manejar otros estados si es necesario
              swalWithBootstrapButtons.fire({
                title: "Error",
                text: "Hubo un problema al crear el item.",
                icon: "error"
              });
            }
          }).catch(error => {
            console.log('soy el error: ',error)
            // Manejar errores en la solicitud
            swalWithBootstrapButtons.fire({
              title: "Error",
              text: "No se pudo crear el item.",
              icon: "error"
            });
          });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelado",
              text: "La creación se revirtió",
              icon: "error"
            });
          }
        });
      })
//----------------------------------------

  
  const handleSubmit = async(e)=>{
    const pageData = {
      img: document.getElementById('itemUrl').value, 
      text: document.getElementById('text').value
     }

console.log(pageData)
    const token = localStorage.getItem('token'); 

    try {
      const pageId = document.getElementById('id').value;
      const response = await fetch(`/api/v3/page/item/create`, {
        method: 'POST',
        body: pageData, // Envía el FormData con el archivo y otros datos
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado
        },
      });
  
      if (response.ok) {
        // Recargar la página después de 2 segundos
        setTimeout(() => {
           window.location.href = `/admin/page/${pageId}`;
        }, 1500);
    
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
        }, 1500);
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
  }
})