import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ClienteAxios from "../../config/axios"; // Configuración personalizada de Axios
import styles from './Login.module.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showContactInfo, setShowContactInfo] = useState(false); // Estado para alternar contenido en el panel derecho

  // Manejar autenticación con Google directamente desde React
  const handleGoogleLogin = (credentialResponse) => {
    if (!credentialResponse.credential) {
      setError("Error de autenticación con Google");
      return;
    }

    try {
      // Decodifica el token de Google
      const decodedToken = jwtDecode(credentialResponse.credential);
      const email = decodedToken.email;

      // Verifica que el correo tenga la terminación requerida del correo Institucional
      if (email.endsWith("@upqroo.edu.mx")) {
        console.log("Inicio de sesión permitido para:", email);
        login(); // Cambia el estado de autenticación
        navigate("/"); // Redirige a la página principal
      } else {
        setError("Solo se permiten correos institucionales (@upqroo.edu.mx).");
        console.error("Correo no permitido:", email);
      }
    } catch (err) {
      setError("Error durante el inicio de sesión con Google.");
      console.error(err);
    }
  };

  // Manejar autenticación con correo y contraseña
  const handleLogin = async () => {
    try {
      const response = await ClienteAxios.post("/login", { email, password });
      if (response.data.success) {
        login(); // Cambia el estado de autenticación
        navigate("/"); // Redirige a la página principal
      } else {
        setError("Credenciales incorrectas.");
      }
    } catch (err) {
      setError("Error al conectarse al servidor.");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["form-container"]}>
        {/* Panel izquierdo */}
        <div className={styles["left-panel"]}>
          <h1>Iniciar sesión</h1>
          <div className={styles["social-icons"]}>
            {/* Google Login */}
            <GoogleOAuthProvider clientId="365648047657-dnne5qrjato3sciepqfbg7peomlrjtq7.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => setError("Error al iniciar sesión con Google")}
              />
            </GoogleOAuthProvider>
          </div>
          <span>O usa tu contraseña de tu correo institucional</span>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className={styles.authError}>{error}</div>}
          <a href="#" id="forgot-password">¿Olvidaste tu contraseña?</a>
          <button className={styles.Inibutton} type="button" onClick={handleLogin}>
            Iniciar sesión
          </button>
        </div>

        {/* Panel derecho */}
        <div className={styles["right-panel"]}>
          {showContactInfo ? (
            <>
              <h1>Contáctanos</h1>
              <p>Correo: correoejemplo@gmail.com</p>
              <p>Teléfono: 123-456-7890</p>
              <button className={styles.registerBtn} onClick={() => setShowContactInfo(false)}>
                Regresar
              </button>
            </>
          ) : (
            <>
              <h1>Bienvenido de nuevo</h1>
              <p>Regístrate con tus datos personales para utilizar todas las funciones del sitio</p>
              <button className={styles.registerBtn} onClick={() => setShowContactInfo(true)}>
                Registrarse
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
