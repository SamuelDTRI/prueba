import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import CreateSucursal from "../components/FormCreate";
import ListSucursales from "../components/ListSucursales";

function AdminView() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeOption, setActiveOption] = useState("crear");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); 
  };

  return (
    <div className="flex h-screen bg-background">
      <div
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-primary text-secondary transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-4">
            <h2 className="text-2xl font-semibold">Admin Panel</h2>
            <button
              className="lg:hidden text-secondary focus:outline-none"
              onClick={() => setIsSidebarOpen(false)}
            >
              ✕
            </button>
          </div>
          <nav className="mt-6 flex-1">
            {["crear", "listar"].map((option) => (
              <a
                key={option}
                href={`#${option}`}
                className={`block px-4 py-2 rounded-lg ${
                  activeOption === option ? "bg-secondary text-primary" : ""
                } hover:bg-button hover:text-primary`}
                onClick={() => setActiveOption(option)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-secondary text-primary shadow px-4 py-4 flex justify-between items-center">
          <button
            className="lg:hidden text-primary focus:outline-none"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰
          </button>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-button text-primary px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          {activeOption === "crear" && (
            <div className="p-6 bg-secondary shadow rounded-lg w-full h-full flex flex-col">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-primary">
                  Crear Nueva Sucursal
                </h2>
                <p className="text-gray-600">
                  Completa el siguiente formulario para agregar una nueva
                  sucursal. Asegúrate de llenar todos los campos obligatorios.
                </p>
              </div>
              <div className="max-w-2xl mx-auto overflow-auto">
                <CreateSucursal />
              </div>
            </div>
          )}
          {activeOption === "listar" && (
            <div className="p-6 bg-secondary shadow rounded-lg">
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Lista de Sucursales
              </h2>
              <ListSucursales appId={1} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminView;
