Sí, puedes sincronizar la expiración de `jsonwebtoken` con la sesión de `express-session` y hacer que cancelar una cancele la otra. Aquí te explico cómo lograrlo:

### 1. **Sincronizar el Tiempo de Expiración**

Para sincronizar el tiempo de expiración de `jsonwebtoken` con `express-session`, puedes configurar el tiempo de expiración del token JWT en función del tiempo restante de la sesión en `express-session`. Aquí tienes un ejemplo básico:

```javascript
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minutos de sesión
}));

// Función para generar JWT
function generateToken(user, session) {
  const expiresIn = session.cookie.maxAge / 1000; // Obtener el tiempo de expiración en segundos
  const token = jwt.sign({ userId: user.id }, 'yourJWTSecretKey', { expiresIn });
  return token;
}

// Ejemplo de uso en un controlador de login
app.post('/login', (req, res) => {
  const user = authenticateUser(req.body.username, req.body.password); // Autentica al usuario

  if (user) {
    req.session.user = user; // Almacena la información del usuario en la sesión
    const token = generateToken(user, req.session);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});
```

### 2. **Cancelar JWT al Finalizar la Sesión**

Para hacer que la cancelación de la sesión también invalide el JWT, puedes hacerlo de dos maneras:

- **Invalidar el JWT en el servidor**: Esto implica llevar un registro de los tokens válidos y revocarlos si la sesión se cierra. Esta estrategia puede requerir más gestión, como almacenar tokens en la base de datos y verificarlos en cada solicitud.

- **Almacenar el token en la sesión**: Puedes almacenar el JWT en la sesión. Cuando la sesión se invalide, el token almacenado también se invalidará.

Aquí hay un ejemplo de cómo almacenar el JWT en la sesión y eliminarlo cuando la sesión se destruye:

```javascript
// Almacenar el token en la sesión al iniciar sesión
app.post('/login', (req, res) => {
  const user = authenticateUser(req.body.username, req.body.password);

  if (user) {
    req.session.user = user;
    const token = generateToken(user, req.session);
    req.session.token = token; // Almacena el token en la sesión
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Middleware para verificar la sesión y el token
function verifySessionAndToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];

  if (req.session.token !== token) {
    return res.status(401).json({ message: 'Invalid session or token' });
  }

  jwt.verify(token, 'yourJWTSecretKey', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
}

// Ejemplo de ruta protegida
app.post('/protected-route', verifySessionAndToken, (req, res) => {
  res.json({ message: 'Access granted' });
});

// Destruir la sesión y cancelar el token
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to log out' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});
```

### 3. **Consideraciones Adicionales**

- **Sincronización manual de la expiración**: Asegúrate de que la expiración del JWT se actualice si la sesión se renueva (si decides implementar la renovación de sesiones).

- **Gestión de tokens**: Si optas por la invalidación de tokens, puedes implementar una lista negra o un sistema de invalidación basado en un campo `iat` (issued at) en el payload del JWT, que se compara con la fecha de último cierre de sesión en la base de datos.

Siguiendo estos pasos, puedes asegurarte de que tanto la sesión como el token JWT expiren de manera sincronizada y se invaliden conjuntamente, proporcionando una capa adicional de seguridad a tu aplicación.