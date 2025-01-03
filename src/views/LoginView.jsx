import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, fetchUser } from "../redux/slices/authSlice";

function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailRegex.test(value)) {
      setEmailError("Correo electrónico no válido");
    } else {
      setEmailError("");
    }
    setEmail(value);
  };

  const validatePassword = (value) => {
    if (value.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres");
    } else if (value.length > 8) {
      setPasswordError("La contraseña debe ser menor a 9 caracteres");
    } else {
      setPasswordError("");
    }
    setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const loginAction = await dispatch(loginUser({ email, password }));
      if (loginAction.type === loginUser.fulfilled.type) {
        const fetchUserAction = await dispatch(fetchUser(email));
        if (fetchUserAction.type === fetchUser.fulfilled.type) {
          navigate("/admin");
        } else {
          setError("No se pudo obtener la información del usuario.");
        }
      } else {
        setError("Credenciales incorrectas.");
      }
    } catch (err) {
      console.error("Error inesperado durante el inicio de sesión:", err);
      setError(err.message || "Ocurrió un error inesperado.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="w-full max-w-sm p-6 bg-secondary shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-primary text-center">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <label
              className="block text-sm font-medium text-primary"
              htmlFor="email"
            >
              Correo
            </label>
            <input
              id="email"
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => validateEmail(e.target.value)}
              className={`w-full mt-1 px-4 py-2 border rounded-lg shadow-sm ${
                emailError ? "border-red-500" : "border-gray-300"
              } bg-secondary text-primary placeholder-primary focus:ring focus:ring-primary focus:outline-none`}
              required
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-primary"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => validatePassword(e.target.value)}
              className={`w-full mt-1 px-4 py-2 border rounded-lg shadow-sm ${
                passwordError ? "border-red-500" : "border-gray-300"
              } bg-secondary text-primary placeholder-primary focus:ring focus:ring-primary focus:outline-none`}
              required
            />
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className={`w-full px-4 py-2 text-primary bg-button hover:bg-yellow-400 rounded-lg shadow focus:outline-none focus:ring focus:ring-primary ${
                emailError || passwordError
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={!!emailError || !!passwordError}
            >
              Ingresar
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full px-4 py-2 text-primary bg-secondary hover:bg-background rounded-lg shadow focus:outline-none focus:ring focus:ring-primary mt-5"
            >
              Regresar a la página principal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginView;
