La función `showAlert` es una función que puedes definir en tu aplicación para mostrar mensajes de alerta o notificaciones al usuario. En el contexto de tu aplicación de formulario de contacto, `showAlert` se utiliza para comunicar al usuario el resultado de la acción de enviar el correo electrónico.

Aquí te proporciono una implementación básica de `showAlert` que podrías usar en tu código:

```javascript
const showAlert = (message, type) => {
    // Crear un elemento div para la alerta
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`; // Clase CSS para estilo (puedes definir estilos en tu CSS)

    // Crear nodo de texto con el mensaje recibido
    const textNode = document.createTextNode(message);
    alertDiv.appendChild(textNode);

    // Agregar la alerta al DOM (por ejemplo, al cuerpo del documento)
    document.body.appendChild(alertDiv);

    // Eliminar la alerta después de unos segundos (opcional)
    setTimeout(() => {
        alertDiv.remove();
    }, 3000); // Eliminar la alerta después de 3 segundos (3000 milisegundos)
};
```

### Explicación de `showAlert`:

1. **Creación del Elemento de Alerta:**
   - Se crea un nuevo elemento `div` usando `document.createElement('div')`. Este elemento será utilizado para mostrar la alerta.

2. **Clase CSS para Estilo:**
   - Se asigna una clase CSS dinámica `alert alert-${type}` al elemento `div`. Aquí, `type` es el tipo de alerta, como `"success"` para éxito o `"error"` para error. Asegúrate de tener estilos CSS definidos para estas clases en tu archivo CSS para controlar la apariencia de la alerta.

3. **Creación del Nodo de Texto:**
   - Se crea un nodo de texto utilizando `document.createTextNode(message)`, donde `message` es el mensaje que deseas mostrar en la alerta.

4. **Añadir el Texto a la Alerta:**
   - Se añade el nodo de texto creado como hijo del elemento `div` de la alerta.

5. **Agregar la Alerta al DOM:**
   - Finalmente, se agrega la alerta al DOM, específicamente al final del cuerpo (`document.body.appendChild(alertDiv)`). Esto mostrará la alerta en la página para que el usuario la vea.

6. **Eliminar la Alerta (Opcional):**
   - Opcionalmente, puedes usar `setTimeout` para eliminar automáticamente la alerta después de cierto tiempo. En este ejemplo, se elimina después de 3 segundos (`3000` milisegundos). Esto es útil para mensajes temporales que no necesitan permanecer en la pantalla indefinidamente.

### Uso de `showAlert` en tu Código:

En tu función `handleSubmit`, donde simulas enviar el correo electrónico y muestras la alerta de éxito o error, puedes llamar a `showAlert` de la siguiente manera:

```javascript
const showAlert = (message, type) => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    const textNode = document.createTextNode(message);
    alertDiv.appendChild(textNode);
    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000); // Eliminar la alerta después de 3 segundos
};

// Dentro de tu función handleSubmit, después de enviar el correo (o simularlo):
showAlert("Mensaje enviado exitosamente", "success");
```

### Personalización y Mejoras:

- **Estilos CSS**: Define clases CSS (`alert-success`, `alert-error`, etc.) en tu archivo CSS para personalizar el aspecto de las alertas según tus necesidades visuales.
  
- **Animaciones y Transiciones**: Si deseas una transición suave para mostrar u ocultar las alertas, considera añadir animaciones CSS a las clases de alerta.

- **Accesibilidad**: Asegúrate de que las alertas sean accesibles, incluyendo atributos `role` y `aria-live` si es necesario para usuarios que dependen de tecnologías de asistencia.

Implementando `showAlert` de esta manera, mejorarás la experiencia del usuario al proporcionar retroalimentación clara y visual sobre el resultado de enviar el formulario de contacto.