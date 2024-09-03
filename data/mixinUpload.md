Claro, puedes modificar el formulario para que la vista previa de la imagen sea automática cuando el usuario seleccione un archivo, y luego agregar un botón para subir la imagen manualmente. Aquí te muestro cómo hacerlo:

### 1. **Actualizar el Mixin en Pug:**

Modifica el mixin para eliminar el botón de vista previa y agregar un botón para subir la imagen:

```pug
mixin fileUpload(inputId, previewId, name)
  .col-md-6.mb-3
    label.form-label(for=inputId) Imagen:
    .input-group
      input.form-control(type="file" id=inputId name=name accept="image/*" data-preview-target=previewId)
      button.btn.btn-outline-primary(type="button" data-action="upload") Subir imagen
    .col-md-6.mb-3
      img#(previewId).img-fluid(src="Not found", alt="Elija una imagen")
```

### 2. **JavaScript para Vista Previa Automática y Subida Manual:**

Actualiza el JavaScript para manejar la vista previa automática y la subida manual:

```javascript
// Vista previa automática cuando se selecciona un archivo
document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const previewTarget = document.querySelector(this.dataset.previewTarget);
            const reader = new FileReader();
            reader.onload = function (e) {
                previewTarget.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
});

// Subir la imagen cuando se presiona el botón de "Subir imagen"
document.querySelectorAll('button[data-action="upload"]').forEach(button => {
    button.addEventListener('click', async function () {
        const input = this.previousElementSibling; // Asume que el input está justo antes del botón
        const file = input.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                if (data.url) {
                    const previewTarget = document.querySelector(input.dataset.previewTarget);
                    previewTarget.src = data.url;
                    // Puedes también almacenar la URL en un input hidden si lo prefieres
                    console.log('Imagen subida con éxito:', data.url);
                } else {
                    console.error('Error al subir la imagen');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            alert('Por favor, seleccione una imagen primero.');
        }
    });
});
```

### 3. **Incorporar el Mixin en tu Formulario:**

Ahora puedes utilizar este mixin actualizado en tu formulario:

```pug
form#createPageForm.needs-validation(novalidate)
  .row
    +fileUpload('fileLogo', 'logoPreview', 'fileLogo')
    +fileUpload('fileLanding', 'landingPreview', 'fileLanding')
    // Para items
    .items-container
      h2 Items: 
      .itemCreate
        +fileUpload('fileInput', 'preview', 'items[0][image]')
```

Con estos cambios:

- **Vista previa automática**: La imagen seleccionada se mostrará automáticamente en el `img` correspondiente cuando se seleccione un archivo.
- **Subida manual**: El usuario tendrá que hacer clic en "Subir imagen" para que la imagen se suba al servidor, obteniendo así la URL que se puede utilizar en el formulario.