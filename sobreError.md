Claro, aquí tienes la vista de error convertida a Pug:

```pug
doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport" content="width=device-width, initial-scale=1.0")
    title Error
  body
    h1 Error #{status}
    p #{message}
    a(href="/") Volver al inicio
```

### Integración en tu aplicación

Asegúrate de que tu aplicación está configurada para usar Pug como motor de plantillas. Si aún no lo has hecho, puedes configurarlo de la siguiente manera en tu archivo principal de configuración (por ejemplo, `app.js` o `server.js`):

```javascript
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configurar Pug como motor de plantillas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Rutas y otros middlewares aquí

// Manejo de errores global para API REST
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message
  });
});

// Manejo de errores para las rutas MVC
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', { message: err.message, status: err.status || 500 });
});

export default app;
```

Con esta configuración, tu aplicación debería estar lista para manejar errores en rutas MVC y redirigir a la vista de error utilizando Pug.