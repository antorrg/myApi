document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const previewButton = document.getElementById('previewButton');
  const cancelButton = document.getElementById('cancelButton');
  const preview = document.getElementById('preview');
  const img = document.getElementById('imageURL');
  const updateForm = document.getElementById('updateForm');
  const submitButton = document.getElementById('submitButton');

  //---------------------------------------------

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
        text: "El item ha sido actualizado.",
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
  //------------------------------

//  // Mostrar el modal cuando se hace clic en "Actualizar"
//  submitButton.addEventListener('click', () => {
//   confirmModal.style.display = 'flex'; // Mostrar el modal
// });

// // Si el usuario hace clic en "Actualizar" en el modal
// confirmBtn.addEventListener('click', async () => {
//   confirmModal.style.display = 'none'; // Ocultar el modal

//   // Aquí iría la lógica para enviar el formulario
//   // Puedes llamar a la función handleSubmit que ya tienes definida
//   handleSubmit();
// });

// // Si el usuario hace clic en "Cancelar" en el modal
// cancelBtn.addEventListener('click', () => {
//   confirmModal.style.display = 'none'; // Ocultar el modal
// });

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

 
    const handleSubmit = async(e)=>{
    const formData = new FormData(updateForm); // Captura todos los campos del formulario

     // Consologuear el contenido de FormData
  // for (const [key, value] of formData.entries()) {
  //   console.log(`${key}:`, value);
  // }
    const token = localStorage.getItem('token'); 

    try {
      const itemId = document.getElementById('itemId').value;
      const response = await fetch(`/api/v3/page/${itemId}`, {
        method: 'PATCH',
        body: formData, // Envía el FormData con el archivo y otros datos
        headers: {
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
 // });
});
