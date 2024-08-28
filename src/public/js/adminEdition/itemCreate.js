document.addEventListener('DOMContentLoaded', ()=>{
    const createForm = document.getElementById('createForm')
    const fileInput = document.getElementById('fileInput')
    const previewButton = document.getElementById('previewButton');
    const cancelButton = document.getElementById('cancelButton');
    const preview = document.getElementById('preview');
    const submitButton = document.getElementById('submitButton')
//sweetalert:------------------------------------------
    submitButton.addEventListener('click', () => {
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
            handleSubmit()
            swalWithBootstrapButtons.fire({
              title: "Hecho!",
              text: "El nuevo item ha sido creado.",
              icon: "success"
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
    img.value = ''; // Borra la URL de la imagen anterior si se cancela
  });
  
  const handleSubmit = async(e)=>{
    const formData = new FormData(createForm); // Captura todos los campos del formulario

     // Consologuear el contenido de FormData
//   for (const [key, value] of formData.entries()) {
//     console.log(`${key}:`, value);
//   }
    const token = localStorage.getItem('token'); 

    try {
      const pageId = document.getElementById('id').value;
      const response = await fetch(`/api/v3/page/item/create`, {
        method: 'POST',
        body: formData, // Envía el FormData con el archivo y otros datos
        headers: {
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