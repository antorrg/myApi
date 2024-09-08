document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const img = document.getElementById('imageURL');
  const updateForm = document.getElementById('updateForm');
  const submitButton = document.getElementById('submitButton');

  //---------------------------------------------

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
    title: "Seguro quiere actualizar?",
    text: "Puede cancelar si lo desea!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Si, actualizar!",
    cancelButtonText: "Cancelar!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      const spinnerContainer = document.querySelector('.spinner-container');
      spinnerContainer.innerHTML = `
        <div><p>Aguarde...</p></div>
        <div class="spinner"</div>
      `;
      spinnerContainer.style.display = 'block'; 
      handleSubmit().then(response => {
        if (response.status===200) {
        swalWithBootstrapButtons.fire({
          title: "Actualizado!",
          text: "El item ha sido actualizado.",
          icon: "success"
        });
   
      } else {
        // Manejar otros estados si es necesario
        swalWithBootstrapButtons.fire({
          title: "Error",
          text: "Hubo un problema al actualizar el item.",
          icon: "error"
        });
       }
    }).catch(error => {
      console.log('soy el error: ',error+{error})
      // Manejar errores en la solicitud
      swalWithBootstrapButtons.fire({
        title: "Error",
        text: "No se pudo actualizar el item.",
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
  //------------------------------

    const handleSubmit = async(e)=>{
    const pageData = {
                      img: document.getElementById('itemUrl').value, 
                      text: document.getElementById('text').value,
                      enable: document.getElementById('enable').value
                     }

              console.log(pageData)
    const token = localStorage.getItem('token'); 

    try {
      const itemId = document.getElementById('itemId').value;
      const response = await fetch(`/api/v3/page/${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify(pageData), // Envía el FormData con el archivo y otros datos
        headers: {
          'Content-Type': 'application/json',   
          'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado
        },
      });
  
      if (response.ok) {
        // document.querySelector('#updateForm').innerHTML = `
        //   <div class="modalContainer">
        //   <div class="modalSuccess">
        //   <h1>¡¡Actualizacion exitosa!!</h1>
        //   </div>
        //   </div>
        // `;
   
        // Recargar la página después de 2 segundos
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        return response
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
        return response
      }
    } catch (error) {
      console.error('aca estoy errando: ',error)
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
      throw error;
    }
  }
 // });
});
