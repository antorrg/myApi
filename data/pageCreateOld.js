document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.querySelector('.items-container');
    const addItemButton = document.getElementById('addItemButton');
    const removeItemButton = document.getElementById('removeItemButton');
    const submitButton = document.getElementById('submitButton')
    const createPageForm = document.getElementById('createPageForm')
    let itemCount = 1; // Comenzamos con un ítem creado por defecto

    document.addEventListener('click', (event) => {
      const target = event.target;
    
      // Verifica si el botón tiene la acción de vista previa
      if (target.dataset.action === 'preview') {
        const input = target.previousElementSibling;
        const previewSelector = input.getAttribute('data-preview-target');
        const preview = document.querySelector(previewSelector);
        //console.log(preview)
    
        if (input.files && input.files[0]) {
          const reader = new FileReader();
          reader.onload = (e) => {
            preview.src = e.target.result;
            preview.style.display = 'block';
          };
          reader.readAsDataURL(input.files[0]);
        }
      }
    
      // Verifica si el botón tiene la acción de cancelar
      if (target.dataset.action === 'cancel') {
        const input = target.previousElementSibling.previousElementSibling;
        const previewSelector = input.getAttribute('data-preview-target');
        const preview = document.querySelector(previewSelector);
        input.value = '';
        preview.src = '';
        preview.style.display = 'none';
      }
    });
    
    // Función para crear un nuevo ítem
    function createNewItem(itemCount) {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('itemCreate', 'row', 'mb-3');
  
      itemDiv.innerHTML = `
        <div class="col-md-6 mb-3">
          <label class="form-label" for="fileInput${itemCount}">Imagen:</label>
          <div class="input-group">
            <input class="form-control" type="file" id="fileInput${itemCount}" name="items[${itemCount}][image]" accept="image/*" data-preview-target="#preview${itemCount}" required>
            <button class="btn btn-outline-secondary" type="button" id="previewButton"  data-action="preview">Vista previa</button>
            <button class="btn btn-outline-danger" type="button" id="cancelButton">Cancelar</button>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <img id="preview${itemCount}" class="img-fluid" src="" alt="Elija una imagen">
        </div>
        <div class="mb-3">
          <label class="form-label" for="text">Texto</label>
          <textarea class="form-control" id="text" name="items[${itemCount}][text]" rows="3" required></textarea>
        </div>
      `;
  
      return itemDiv;
    }
  
    // Agregar un nuevo ítem
    addItemButton.addEventListener('click', () => {
      if (itemCount < 6) {
        const newItem = createNewItem(itemCount);
        //itemsContainer.appendChild(newItem);
        itemsContainer.insertBefore(newItem, addItemButton.closest('.button-group'));
        itemCount++;
      } else {
        const modalHtml1 = `
        <div class="modalContainer" id="temporaryModal">
          <div class="modalFailed">
            <h4>No puedes agregar más de 6 ítems!</h4>
            <strong>Puedes agregarlos mas adelante</strong>
          </div>
        </div>
      `;
      
      // Insertar el modal en el DOM
      document.body.insertAdjacentHTML('beforeEnd', modalHtml1);
      setTimeout(() => {
        const temporaryModal = document.getElementById('temporaryModal');
        if (temporaryModal) {
          temporaryModal.remove();
        }
      }, 2000);
        
      }
    });
  
    // Eliminar el último ítem
    removeItemButton.addEventListener('click', () => {
      if (itemCount > 1) {
        const itemCreateElements = itemsContainer.querySelectorAll('.itemCreate');
    
        // Elimina el último ítem creado
        itemsContainer.removeChild(itemCreateElements[itemCreateElements.length - 1]);
        itemCount--;
      } else {
          // Crear el modal
  const modalHtml2 = `
    <div class="modalContainer" id="temporaryModal">
      <div class="modalFailed">
        <h4>Debes tener al menos un ítem!</h4>
      </div>
    </div>
  `;
  
  // Insertar el modal en el DOM
  document.body.insertAdjacentHTML('beforeEnd', modalHtml2);
  setTimeout(() => {
    const temporaryModal = document.getElementById('temporaryModal');
    if (temporaryModal) {
      temporaryModal.remove();
    }
  }, 2000);
      }
    });
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
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style="width: 40%;" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        `;
        spinnerContainer.style.display = 'block'; 

      // Llamada a la función handleSubmit y manejo de la respuesta
       handleSubmit().then(response => {
        if (response.status === 201) {
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
      console.log('soy id formulario: ',createPageForm)
      const formData = new FormData(createPageForm); // Captura todos los campos del formulario
  
     // Consologuear el contenido de FormData
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
   }
      const token = localStorage.getItem('token'); 
  
      try {
       
        const response = await fetch(`/api/v3/page/createProject`, {
          method: 'POST',
          body: formData, // Envía el FormData con el archivo y otros datos
          headers: {
            'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado
          },
        });
    
        if (response.ok) {
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