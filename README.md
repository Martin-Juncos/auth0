### 🗒️ Introducción a Auth0 en React

**Auth0** es una plataforma de autenticación y autorización que facilita la gestión segura del acceso de usuarios en aplicaciones web y móviles. Permite a los desarrolladores implementar métodos de autenticación sin necesidad de construir toda la infraestructura, como inicio de sesión social, SSO (Inicio de sesión único) y MFA (Autenticación multifactor).

---

## 🔹 Integración de Auth0 en React: Conceptos y Código

### 1. **Auth0Provider**

- **Descripción**: Es el proveedor principal de contexto que integra Auth0 en la aplicación React. Envuelve toda la aplicación y permite acceder a los métodos y propiedades de Auth0 en cualquier componente hijo.
- **Código**:

  ```javascript
  import { Auth0Provider } from "@auth0/auth0-react";

  const App = () => (
    <Auth0Provider
      domain="YOUR_DOMAIN"
      clientId="YOUR_CLIENT_ID"
      redirectUri={window.location.origin}
    >
      <YourAppComponent />
    </Auth0Provider>
  );
  ```

- **Explicación**: Aquí, `Auth0Provider` configura el dominio, el ID del cliente, y la URL de redirección. Este componente envuelve la aplicación, proporcionando acceso a los métodos y estados de autenticación en toda la app.

---

### 2. **loginWithRedirect**

- **Descripción**: Método que redirige al usuario a la página de inicio de sesión de Auth0.
- **Código**:

  ```javascript
  import { useAuth0 } from "@auth0/auth0-react";

  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <button onClick={() => loginWithRedirect()}>Iniciar Sesión</button>;
  };
  ```

- **Explicación**: `loginWithRedirect` se utiliza para iniciar sesión. Al hacer clic en el botón, el usuario es redirigido a la interfaz de Auth0 para autenticarse. Una vez autenticado, vuelve a la URL definida en `Auth0Provider`.

---

### 3. **logout**

- **Descripción**: Método que permite cerrar sesión y redirigir al usuario a una página específica tras el logout.
- **Código**:

  ```javascript
  import { useAuth0 } from "@auth0/auth0-react";

  const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Cerrar Sesión
      </button>
    );
  };
  ```

- **Explicación**: `logout` elimina la sesión del usuario y lo redirige a la página especificada en `returnTo`. Es útil para limpiar la sesión y proteger las rutas.

---

### 4. **user**

- **Descripción**: Objeto que contiene la información del usuario autenticado, como nombre, correo electrónico, y avatar.
- **Código**:

  ```javascript
  import { useAuth0 } from "@auth0/auth0-react";

  const UserProfile = () => {
    const { user } = useAuth0();
    return (
      <div>
        <img src={user.picture} alt="Foto de perfil" />
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
      </div>
    );
  };
  ```

- **Explicación**: `user` permite mostrar detalles del usuario autenticado. Esto es útil para personalizar la interfaz con la información del usuario.

---

### 5. **isAuthenticated**

- **Descripción**: Booleano que indica si el usuario está autenticado.
- **Código**:

  ```javascript
  import { useAuth0 } from "@auth0/auth0-react";

  const NavBar = () => {
    const { isAuthenticated } = useAuth0();
    return isAuthenticated ? <LogoutButton /> : <LoginButton />;
  };
  ```

- **Explicación**: `isAuthenticated` permite condicionar la UI. Aquí, se muestra el botón de cierre de sesión si el usuario está autenticado, y el de inicio de sesión si no lo está.

---

### 6. **isLoading**

- **Descripción**: Booleano que indica si la autenticación está en proceso o carga inicial.
- **Código**:

  ```javascript
  import { useAuth0 } from "@auth0/auth0-react";

  const LoadingScreen = () => {
    const { isLoading } = useAuth0();
    return isLoading ? <p>Cargando...</p> : <MainContent />;
  };
  ```

- **Explicación**: `isLoading` es útil para mostrar una pantalla de carga o spinner mientras Auth0 valida la sesión, evitando mostrar contenido hasta que el proceso de autenticación esté completo.

---

## Resumen del Código Completo de Ejemplo

Este ejemplo muestra una aplicación básica de React con Auth0, que incluye inicio de sesión, cierre de sesión y visualización del perfil de usuario.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

const App = () => (
  <Auth0Provider
    domain="YOUR_DOMAIN"
    clientId="YOUR_CLIENT_ID"
    redirectUri={window.location.origin}
  >
    <Main />
  </Auth0Provider>
);

const Main = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Iniciar Sesión</button>
      ) : (
        <>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Cerrar Sesión
          </button>
          <div>
            <img src={user.picture} alt="Profile" />
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
          </div>
        </>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```

En esta estructura:

- **`Auth0Provider`** configura Auth0 para la aplicación completa.
- **`loginWithRedirect`** y **`logout`** manejan la autenticación del usuario.
- **`user`** permite mostrar información del usuario.
- **`isAuthenticated`** controla qué contenido mostrar según el estado de autenticación.
- **`isLoading`** gestiona el contenido mientras se verifica la sesión.

Auth0 en React simplifica la autenticación en aplicaciones SPA, asegurando una implementación segura y eficaz.

Made by Prof. Martin with a lot of 💖 and ☕
