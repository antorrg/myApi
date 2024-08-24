Claro, puedo ayudarte a configurar tu plantilla EJS para que renderice una barra lateral (sidebar) fija y el contenido dinámico a la derecha de la misma.

### Estructura Básica

Vamos a dividir tu plantilla en dos partes principales:
1. La estructura fija que contiene la barra lateral.
2. El contenido dinámico que se renderizará a la derecha de la barra lateral.

### Plantilla Principal (`layout.ejs`)

Esta plantilla contendrá la estructura básica, incluyendo la barra lateral. Usaremos una sección especial para insertar el contenido dinámico.

```html
<!doctype html>
<html lang="es" data-bs-theme="auto">
<head>
  <script src="/js/adminData.js" type="module"></script>
  <script src="/js/color-modes.js"></script>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
  <meta name="generator" content="Hugo 0.122.0">
  <title>Admin Dashboard</title>

  <link href="/css/bootstrap.min.css" rel="stylesheet">
  <link href="/css/sidebars.css" rel="stylesheet">

  <style>
    .sidebar {
      width: 250px;
      height: 100vh;
      position: fixed;
    }

    .content {
      margin-left: 260px;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="sidebar">
    <!-- Aquí va el contenido de tu barra lateral -->
    <nav>
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/page1">Página 1</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/page2">Página 2</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/page3">Página 3</a>
        </li>
      </ul>
    </nav>
  </div>

  <div class="content">
    <!-- Aquí se insertará el contenido dinámico -->
    <%- body %>
  </div>

  <script src="/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### Plantillas Parciales

Para cada una de las vistas dinámicas (por ejemplo, `page1`, `page2`, etc.), puedes crear plantillas parciales que se insertarán en la sección `body` de la plantilla principal.

#### `page1.ejs`

```html
<h1>Contenido de la Página 1</h1>
<p>Este es el contenido específico de la página 1.</p>
```

#### `page2.ejs`

```html
<h1>Contenido de la Página 2</h1>
<p>Este es el contenido específico de la página 2.</p>
```

### Configuración de Rutas en Express

En tu archivo de configuración de rutas en Express, asegúrate de renderizar las plantillas parciales dentro de la plantilla principal.

```javascript
const express = require('express');
const router = express.Router();

// Ruta para la página 1
router.get('/page1', (req, res) => {
  res.render('layout', { body: 'page1' });
});

// Ruta para la página 2
router.get('/page2', (req, res) => {
  res.render('layout', { body: 'page2' });
});

// Otras rutas
router.get('/page3', (req, res) => {
  res.render('layout', { body: 'page3' });
});

module.exports = router;
```

### Controlador de Rutas

Asegúrate de configurar correctamente tu aplicación Express para usar el enrutador.

```javascript
const express = require('express');
const app = express();
const path = require('path');

const adminRouter = require('./routes/admin'); // Asegúrate de ajustar la ruta según tu estructura de archivos

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/admin', adminRouter);

app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
```

### Explicación

1. **Plantilla Principal (`layout.ejs`)**: Contiene la estructura fija de tu página, incluyendo la barra lateral.
2. **Plantillas Parciales**: Contienen el contenido específico para cada vista.
3. **Enrutamiento en Express**: Renderiza la plantilla principal (`layout.ejs`) e inserta el contenido dinámico (`page1`, `page2`, etc.) en la sección `body`.

Con esta configuración, tu barra lateral será siempre visible, y el contenido a la derecha se actualizará según la ruta que se active.