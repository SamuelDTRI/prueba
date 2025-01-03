import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundView = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-background text-primary">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">
        Oops... La página que buscas no existe o ha sido movida.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-button text-secondary font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition-all duration-300"
      >
        Volver al inicio
      </button>
      <div className="mt-10">
        <img
          src="https://via.placeholder.com/400x300"
          alt="Not found"
          className="max-w-full rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default NotFoundView;
