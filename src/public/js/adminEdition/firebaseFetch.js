
document.addEventListener("DOMContentLoaded", function() {
    fetch('./fireConfig')
    .then(response => response.json())
    .then(config => {
      // Inicializar Firebase con la configuración recibida
      firebase.initializeApp(config);
      console.log(config)
      // Ahora puedes usar Firebase en tu frontend
    })
    .catch(error => console.error('Error fetching Firebase config:', error));
  });
  