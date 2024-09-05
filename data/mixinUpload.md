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

<hr>

## Segunda peticion de un mixin de pug: 

Aquí tienes un mixin en Pug que cumple con los requisitos:

```pug
mixin imageUpload(fieldName, label, previewId, responseInputId, imageUrl)
  .col-md-6.mb-3
    label.form-label(for=fieldName) #{label}:
    .input-group
      input.form-control(type="file" id=fieldName name=fieldName accept="image/*" onchange=`handleFileSelect('${previewId}')`)
      button.btn.btn-outline-danger(type="button" onclick=`cancelImage('${previewId}')`) Cancelar
  
  .col-md-6.mb-3
    img#(previewId).img.w-25.h-auto(src=imageUrl, alt="Vista previa")
  
  input(type="hidden" id=responseInputId name=responseInputId)

script.
  function handleFileSelect(previewId) {
    const fileInput = document.getElementById(previewId.replace('Preview', ''));
    const previewImage = document.getElementById(previewId);
    const file = fileInput.files[0];
    const reader = new FileReader();
  
    reader.onload = function(e) {
      previewImage.src = e.target.result;
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function cancelImage(previewId) {
    const previewImage = document.getElementById(previewId);
    const fileInput = document.getElementById(previewId.replace('Preview', ''));
    fileInput.value = '';
    previewImage.src = 'Not found';
  }

  async function handleSubmit() {
    const formData = new FormData(document.querySelector('form'));
    
    // Aquí realizas el fetch y recibes la respuesta
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    
    if (result.success) {
      document.getElementById(responseInputId).value = result.imageUrl;
    }
  }
```

### Cómo usar el mixin:
```pug
+imageUpload('fileLogo', 'Logo:', 'logoPreview', 'logoUrl', page.info.logo || 'Not found')
```

### Explicación:
1. **fileLogo**: El `id` y `name` del campo de archivo.
2. **Logo**: La etiqueta que se mostrará junto al campo de archivo.
3. **logoPreview**: El `id` de la imagen de vista previa.
4. **logoUrl**: El `id` del input oculto donde se almacenará la URL de la imagen devuelta por el servidor.
5. **page.info.logo**: La URL de la imagen actual (si existe).

### Funcionalidad:
- **handleFileSelect**: Carga automáticamente la vista previa cuando se selecciona un archivo.
- **cancelImage**: Restaura la vista previa y limpia el campo de archivo.
- **handleSubmit**: Envía el formulario y actualiza el input oculto con la URL de la imagen devuelta por el servidor.

Puedes modificar el script según tu lógica de backend y nombres de campos específicos.

<hr>

## Esta vez con boton de subida: 

Aquí te dejo el mixin actualizado, incluyendo un botón de subida que activa la carga de la imagen al servidor:

```pug
mixin imageUpload(fieldName, label, previewId, responseInputId, imageUrl, uploadButtonId)
  .col-md-6.mb-3
    label.form-label(for=fieldName) #{label}:
    .input-group
      input.form-control(type="file" id=fieldName name=fieldName accept="image/*" onchange=`handleFileSelect('${previewId}')`)
      button.btn.btn-outline-secondary(type="button" id=uploadButtonId onclick=`uploadImage('${fieldName}', '${previewId}', '${responseInputId}')`) Subir
      button.btn.btn-outline-danger(type="button" onclick=`cancelImage('${previewId}')`) Cancelar
  
  .col-md-6.mb-3
    img#(previewId).img.w-25.h-auto(src=imageUrl, alt="Vista previa")
  
  input(type="hidden" id=responseInputId name=responseInputId)

script.
  function handleFileSelect(previewId) {
    const fileInput = document.getElementById(previewId.replace('Preview', ''));
    const previewImage = document.getElementById(previewId);
    const file = fileInput.files[0];
    const reader = new FileReader();
  
    reader.onload = function(e) {
      previewImage.src = e.target.result;
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function cancelImage(previewId) {
    const previewImage = document.getElementById(previewId);
    const fileInput = document.getElementById(previewId.replace('Preview', ''));
    fileInput.value = '';
    previewImage.src = 'Not found';
  }

  async function uploadImage(fieldName, previewId, responseInputId) {
    const fileInput = document.getElementById(fieldName);
    const formData = new FormData();
    formData.append(fieldName, fileInput.files[0]);

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        document.getElementById(responseInputId).value = result.imageUrl;
        alert('Imagen subida exitosamente.');
      } else {
        alert('Error al subir la imagen.');
      }
    } catch (error) {
      console.error('Error en la subida:', error);
      alert('Error en la subida.');
    }
  }
```

### Cómo usar el mixin:
```pug
+imageUpload('fileLogo', 'Logo:', 'logoPreview', 'logoUrl', page.info.logo || 'Not found', 'uploadButtonLogo')
```

### Explicación de las nuevas partes:
- **uploadButtonId**: El `id` del botón que iniciará la subida de la imagen.
- **uploadImage**: Esta función se ejecuta al hacer clic en el botón de subida. Envía el archivo seleccionado al servidor y, si la subida es exitosa, actualiza el campo oculto con la URL de la imagen y muestra un mensaje de confirmación.

### Flujo:
1. **Subida manual**: El usuario selecciona la imagen, la previsualiza, y luego hace clic en el botón "Subir" para enviarla al servidor.
2. **Respuesta del servidor**: La URL de la imagen subida se almacena en un campo oculto del formulario, lista para ser enviada junto con otros datos cuando se envíe el formulario completo.

Este enfoque proporciona control total sobre cuándo se sube la imagen, permitiendo que el usuario confirme su elección antes de hacer la subida.

<hr>

## Sin Id en el boton:

No, no es estrictamente necesario proporcionar un ID único para cada botón de subida si no necesitas manipularlos de manera individual después. Si todos los botones de subida realizan la misma acción, puedes simplificar el mixin eliminando el `id` del botón de subida y manejando la lógica sin depender de un `id` específico. Aquí tienes una versión simplificada:

```pug
mixin imageUpload(fieldName, label, previewId, responseInputId, imageUrl)
  .col-md-6.mb-3
    label.form-label(for=fieldName) #{label}:
    .input-group
      input.form-control(type="file" id=fieldName name=fieldName accept="image/*" onchange=`handleFileSelect('${previewId}')`)
      button.btn.btn-outline-secondary(type="button" onclick=`uploadImage('${fieldName}', '${previewId}', '${responseInputId}')`) Subir
      button.btn.btn-outline-danger(type="button" onclick=`cancelImage('${previewId}')`) Cancelar
  
  .col-md-6.mb-3
    img#(previewId).img.w-25.h-auto(src=imageUrl, alt="Vista previa")
  
  input(type="hidden" id=responseInputId name=responseInputId)

script.
  function handleFileSelect(previewId) {
    const fileInput = document.getElementById(previewId.replace('Preview', ''));
    const previewImage = document.getElementById(previewId);
    const file = fileInput.files[0];
    const reader = new FileReader();
  
    reader.onload = function(e) {
      previewImage.src = e.target.result;
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function cancelImage(previewId) {
    const previewImage = document.getElementById(previewId);
    const fileInput = document.getElementById(previewId.replace('Preview', ''));
    fileInput.value = '';
    previewImage.src = 'Not found';
  }

  async function uploadImage(fieldName, previewId, responseInputId) {
    const fileInput = document.getElementById(fieldName);
    const formData = new FormData();
    formData.append(fieldName, fileInput.files[0]);

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        document.getElementById(responseInputId).value = result.imageUrl;
        alert('Imagen subida exitosamente.');
      } else {
        alert('Error al subir la imagen.');
      }
    } catch (error) {
      console.error('Error en la subida:', error);
      alert('Error en la subida.');
    }
  }
```

### Cómo usar el mixin:
```pug
+imageUpload('fileLogo', 'Logo:', 'logoPreview', 'logoUrl', page.info.logo || 'Not found')
```

### Explicación:
- **Sin ID en el botón**: El botón de subida no necesita un `id` si no vas a hacer referencia específica a él más adelante. La función `uploadImage` se ejecuta directamente desde el botón, utilizando los parámetros que se pasan cuando se define el mixin.
  
Este enfoque es más limpio si todos los botones realizan la misma acción y no necesitas diferenciarlos individualmente en el DOM.


<hr>

## Con imageUrl opcional:

Sí, es posible hacer que el `imageUrl` en tu mixin sea opcional para adaptarse tanto a formularios de creación como de edición. Esto se puede lograr configurando un valor predeterminado para `imageUrl` en el mixin y utilizando lógica condicional en el HTML para manejar los diferentes casos.

### 1. Configuración del Mixin

Puedes hacer que el parámetro `imageUrl` tenga un valor predeterminado, por ejemplo, una cadena vacía, y luego manejar la lógica en el mixin para decidir si mostrar una imagen por defecto o no.

### 2. Ajuste del Mixin `imageUpload`

Aquí te muestro cómo puedes ajustar el mixin:

```pug
mixin imageUpload(fieldName, label, previewId, responseInputId, imageUrl = '')
  .col-md-6.mb-3
    label.form-label(for=fieldName) #{label}:
    .input-group
      input.form-control(type="file" id=fieldName name=fieldName accept="image/*" onchange=`handleFileSelect('${previewId}')`)
      button.btn.btn-outline-secondary(type="button" onclick=`uploadImage('${fieldName}', '${previewId}', '${responseInputId}')`) Subir
      button.btn.btn-outline-danger(type="button" onclick=`cancelImage('${previewId}')`) Cancelar
  
  .col-md-6.mb-3
    //- Si imageUrl tiene un valor, usa ese valor como src. De lo contrario, deja el src en blanco.
    img.img.w-25.h-auto(id=previewId, src=imageUrl ? imageUrl : '', alt="Vista previa")

  input(type="hidden" id=responseInputId name=responseInputId)

  script.
    function handleFileSelect(previewId) {
      const fileInput = document.getElementById(previewId.replace('Preview', ''));
      const previewImage = document.getElementById(previewId);
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = function(e) {
        previewImage.src = e.target.result;
      }

      if (file) {
        reader.readAsDataURL(file);
      }
    }

    function cancelImage(previewId) {
      const previewImage = document.getElementById(previewId);
      const fileInput = document.getElementById(previewId.replace('Preview', ''));
      fileInput.value = '';
      previewImage.src = '';
    }

    async function uploadImage(fieldName, previewId, responseInputId) {
      const fileInput = document.getElementById(fieldName);
      const formData = new FormData();
      formData.append(fieldName, fileInput.files[0]);

      const token = localStorage.getItem('token'); 

      try {
        console.log(formData)
        //- const response = await fetch('/api/v3/admin/upload', {
        //-   method: 'POST',
        //-   body: formData,
        //-   headers: {
        //-     'Authorization': `Bearer ${token}`, 
        //-   },
        //- });

        const result = await response.json();
        
        if (result.success) {
          document.getElementById(responseInputId).value = result.imageUrl;
          alert('Imagen subida exitosamente.');
        } else {
          alert('Error al subir la imagen.');
        }
      } catch (error) {
        console.error('Error en la subida:', error);
        alert('Error en la subida.');
      }
    }
```

### 3. Uso del Mixin en Formularios de Creación y Edición

- **Formulario de Creación**: Simplemente llama al mixin con `imageUrl` como una cadena vacía (que es el valor por defecto).
  
  ```pug
  +imageUpload('fileLogo', 'Logo', 'logoPreview', 'logoUrl')
  ```

- **Formulario de Edición**: Pasa la URL de la imagen existente al `imageUrl` para que se muestre la imagen actual en la vista previa.

  ```pug
  +imageUpload('fileLogo', 'Logo', 'logoPreview', 'logoUrl', existingImageUrl)
  ```

Donde `existingImageUrl` es la variable que contiene la URL de la imagen que ya está almacenada en tu base de datos o en el servidor.

### 4. Lógica Condicional en la Vista Previa

El uso del operador ternario `imageUrl ? imageUrl : ''` en la propiedad `src` del elemento `<img>` asegura que si `imageUrl` tiene un valor (en el caso de un formulario de edición), se utilizará para mostrar la imagen. Si `imageUrl` está vacío (en un formulario de creación), no se mostrará ninguna imagen por defecto. 

Esto te permitirá usar el mismo mixin en ambos contextos, facilitando la reutilización del código y manteniendo la flexibilidad en tu aplicación.