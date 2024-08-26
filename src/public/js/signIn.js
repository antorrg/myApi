
  document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    const email = document.querySelector('#floatingInput').value;
    const password = document.querySelector('#floatingPassword').value;

    // Aquí puedes agregar tu lógica para manejar el envío del formulario
    //console.log('Email:', email);
    //console.log('Password:', password);
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const result = await response.json();
     
  
      if (response.status === 200) {
          // Almacenar el token en localStorage
          localStorage.setItem('token', result.token);
          //  document.querySelector('main').innerHTML = `
          // <div class="modal-sm position-static p-4 py-md-5" tabindex="-1" role="dialog" id="modalChoice">
          // <div class="modal-dialog" role="document">
          //   <div class="modal-content rounded-3 shadow">
          //     <div class="modal-body p-4 text-center">
          //       <h2 class="mb-0">¡¡Verificacion exitosa!!</h2>
          //       <h4 class="mb-0">¡Bienvenido/a!</h4>
          //     </div>
          //   </div>
          // </div>
          // </div>`
        // document.querySelector('main').innerHTML = `
        //   <div class="modalContainer">
        //   <div class="modalSuccess">
        //   <h1>¡¡Verificacion exitosa!!</h1>
        //   <h2>¡Bienvenido/a!</h2>
        //   </div>
        //   </div>
        // `;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Verificacion exitosa. Bienvenido/a!!",
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          window.location.href = '/admin';
        }, 1100);
      
      } else {
        // Mostrar mensaje de error
        //console.log('Soy Result: ',result)
        document.querySelector('main').innerHTML = `
          <div class="modalContainer">
          <div class='modalFailed'>
          <h1>Error ${response.status}</h1>
          <h2>${result.error}</h2>
          <strong>Por favor intente de nuevo</strong>
          </div>
          </div>
        `;
  
        // Volver a mostrar el formulario después de 2 segundos
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error('Error:', error);
    }

});
