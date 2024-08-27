document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
  
    const email = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value;
  
    try {
      const response = await fetch('/api/v3/login', {
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
  
        // Redirigir a la página de administración
        window.location.href = '/admin';
      } else {
        // Mostrar mensaje de error
        document.querySelector('main').innerHTML = `
          <div class="alert alert-danger" role="alert">
            ${result.message}
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
  