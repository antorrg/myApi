document.addEventListener('DOMContentLoaded', () => {
  const logoUrl = document.getElementById('logoUrl').value;
  const landingUrl = document.getElementById('landingUrl');
  const inputTitle = document.getElementById('title').value;
  const inputInfo_header = document.getElementById('info_header');
  const inputInfo_body = document.getElementById('info_body');
  const inputUrl = document.getElementById('url');
  const inputEnable = document.getElementById('enable');
  const item0Url = document.getElementById('item0Url');
  const item1Url = document.getElementById('item1Url');
  const item2Url = document.getElementById('item2Url');
  const text0 = document.getElementById('text0');
  const text1 = document.getElementById('text1');
  const text2 = document.getElementById('text2');
  const submitButton = document.getElementById('submitButton')


//sweetalert:------------------------------------------
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

  // Validar los ítems
  const items = [
    { img: document.getElementById('item0Url').value.trim(), text: document.getElementById('text0').value.trim() },
    { img: document.getElementById('item1Url').value.trim(), text: document.getElementById('text1').value.trim() },
    { img: document.getElementById('item2Url').value.trim(), text: document.getElementById('text2').value.trim() }
  ];
  
  const emptyItem = items.some(item => !item.img || !item.text);
  if (emptyItem) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Asegurese que los items esten completos",
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
    title: "Seguro quiere crear el proyecto?",
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
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="progress mt-3" style="height: 20px;">
          <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: 90%;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      `;
      spinnerContainer.style.display = 'block'; 

    // Llamada a la función handleSubmit y manejo de la respuesta
     handleSubmit().then(response => {
      console.log('soy la response: ', response)
      if (response.status===201) {
        swalWithBootstrapButtons.fire({
          title: "¡Hecho!",
          text: "El nuevo proyecto ha sido creado.",
          icon: "success"
        });
   
      } else {
        // Manejar otros estados si es necesario
        swalWithBootstrapButtons.fire({
          title: "Error",
          text: "Hubo un problema al crear el proyecto.",
          icon: "error"
        });
      }
    }).catch(error => {
      console.log('soy el error: ',error)
      // Manejar errores en la solicitud
      swalWithBootstrapButtons.fire({
        title: "Error",
        text: "No se pudo crear el proyecto.",
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
 //Armar objeto para enviar al back: 
const pageData = {
  title: document.getElementById('title').value,
  logo: document.getElementById('logoUrl').value,
  landing: document.getElementById('landingUrl').value,
  info_header: document.getElementById('info_header').value,
  info_body: document.getElementById('info_body').value,
  url : document.getElementById('url').value,
  enable: document.getElementById('enable').value,
  items : [
            {img: document.getElementById('item0Url').value, 
             text: document.getElementById('text0').value
            },
            {img: document.getElementById('item1Url').value, 
              text: document.getElementById('text1').value
            },
            {img: document.getElementById('item2Url').value, 
              text: document.getElementById('text2').value
            },
          ]
              }

              console.log(pageData)
    const token = localStorage.getItem('token'); 

    try {
      const response = await fetch(`/api/v3/page/createProject`, {
        method: 'POST',
        body: JSON.stringify(pageData), // Envía el FormData con el archivo y otros datos
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado
        },
      });
  
      if (response.ok) {
        console.log(response)
        // Recargar la página después de 2 segundos
        document.querySelector('#createPageForm').innerHTML = `
         <div class="spinner-grow text-primary" role="status">
         <span class="visually-hidden">Loading...</span>
         </div>
        `
       
        setTimeout(() => {
           window.location.href = `/admin`;
        }, 150000);
        
    
      } else {
        document.querySelector('#createPageForm').innerHTML = `
          <div class="alert alert-danger" role="alert" style="text-align: center; margin: 20px auto; border: 2px solid #8d281e; max-width: 400px; padding: 20px;">
            <h1>Error ${response.status}</h1>
            <h2>${response.statusText}</h2>
            <strong>Por favor intente de nuevo</strong>
          </div>
        `;
  
        setTimeout(() => {
          window.location.reload();
        }, 150000);
      }
    } catch (error) {
      document.querySelector('#createPageForm').innerHTML = `
        <div class="alert alert-danger" role="alert" style="text-align: center; margin: 20px auto; border: 2px solid #8d281e; max-width: 400px; padding: 20px;" >
          <h1>Error</h1>
          <h2>${error.message}</h2>
          <strong>Por favor intente de nuevo</strong>
        </div>
      `;
      setTimeout(() => {
        window.location.reload();
      }, 150000);
    }
  }

});