
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
          
        document.querySelector('main').innerHTML = `
          <div class="modalContainer">
          <div class="modalSuccess">
          <h1>¡¡Verificacion exitosa!!</h1>
          <h2>¡Bienvenido/a!</h2>
          </div>
          </div>
        `;
        setTimeout(() => {
          window.location.href = '/admin';
        }, 2000);
      
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
