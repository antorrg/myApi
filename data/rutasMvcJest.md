Para realizar pruebas unitarias en Jest para rutas que utilizan `res.render()`, puedes hacer uso de "mocks" en Jest para simular las funciones de Express. En este caso, se debe simular el comportamiento de `res.render()` y `req.session.isAuthenticated`, así como verificar la lógica de `getHome`.

### 1. **Simulación de `res.render`**:
Jest permite crear mocks para `res.render` y capturar sus argumentos para verificar si se llamó correctamente con los datos adecuados.

### 2. **Mocks de `req`, `res`, y `next`**:
- Simulamos `req` para incluir la sesión.
- Simulamos `res` para capturar lo que se pasa a `res.render`.
- Simulamos `next` para manejar cualquier propagación de errores.

Aquí te dejo un ejemplo para probar la ruta `getHome`:

### Test para `getHome`:

#### Configuración del test:
1. Debemos usar `jest.mock` para cualquier servicio externo (como `serv.getHome` en tu caso).
2. Simulamos el middleware `mid.protectRoute` para asegurarnos de que la ruta pueda pasar.

#### Ejemplo de Test:

```javascript
import ctr from '../src/controllers/homeController'; // Importa tu controlador
import serv from '../src/services/homeService'; // Servicio que devuelve los datos de `getHome`

jest.mock('../src/services/homeService'); // Mockea el servicio

describe("GET /home", () => {
  let req, res, next;

  beforeEach(() => {
    // Simulamos req, res, y next
    req = {
      session: { isAuthenticated: true },  // Sesión autenticada
    };

    res = {
      render: jest.fn(),  // Simulamos res.render
      status: jest.fn().mockReturnThis(),  // Para manejar errores
    };

    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpiamos los mocks después de cada test
  });

  it("Debería renderizar la vista 'index' con la información correcta", async () => {
    const mockInfo = { title: 'Home Page' };  // Datos simulados que devuelve el servicio

    // Configuramos el mock del servicio para devolver los datos simulados
    serv.getHome.mockResolvedValue(mockInfo);

    // Llamamos al controlador con los mocks
    await ctr.getHome(req, res, next);

    // Verificamos que se llamó a res.render con los datos correctos
    expect(res.render).toHaveBeenCalledWith("index", {
      info: mockInfo,
      isAuthenticated: true
    });
  });

  it("Debería manejar errores y renderizar la vista de error", async () => {
    const mockError = new Error("Error en el servidor");
    mockError.status = 500;

    // Configuramos el mock del servicio para lanzar un error
    serv.getHome.mockRejectedValue(mockError);

    // Llamamos al controlador con los mocks
    await ctr.getHome(req, res, next);

    // Verificamos que se llamó a res.render con la vista de error
    expect(res.render).toHaveBeenCalledWith("error", {
      message: mockError.message,
      status: 500,
    });
  });
});
```

### Explicación:
1. **Mocks de `req`, `res`, y `next`**:
   - **`req`**: Simula la sesión, en este caso, con `isAuthenticated: true`.
   - **`res.render`**: Simula el método `render` de Express para capturar si se llama correctamente con los datos esperados.
   - **`res.status`**: Es opcional, pero lo simulamos para poder verificar llamadas a `res.status()` en caso de errores.

2. **Test con datos correctos**:
   - Se verifica que cuando `serv.getHome()` devuelve datos correctamente, el controlador llama a `res.render()` con la vista `'index'` y los datos correspondientes.

3. **Test con errores**:
   - Se verifica que, en caso de un error, el controlador llama a `res.render()` con la vista `'error'`, pasando el mensaje y el estado del error.

### Ajustes:
- **Middleware**: Si tienes un middleware como `mid.protectRoute`, puedes simular su comportamiento para evitar bloquear las pruebas.
  
  Ejemplo de mock de middleware:
  ```javascript
  jest.mock('../src/middlewares/middlewares.js', () => ({
    protectRoute: jest.fn((req, res, next) => next()),
  }));
  ```

Este enfoque te permite verificar cómo el controlador maneja tanto el flujo exitoso como los errores, sin necesidad de realizar pruebas de integración con un servidor real.