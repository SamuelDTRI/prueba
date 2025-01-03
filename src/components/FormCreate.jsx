import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBranch } from "../redux/slices/branchesSlice";

function CreateSucursal() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    descripcion: "",
    city_id: "",
    latitud: "",
    longitud: "",
    telefono: "",
    direccion: "",
    imagen: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData((prev) => ({
          ...prev,
          imagen: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const resultAction = await dispatch(addBranch(formData));
      if (addBranch.fulfilled.match(resultAction)) {
        alert("Sucursal creada exitosamente.");
        setFormData({
          nombre: "",
          email: "",
          descripcion: "",
          city_id: "",
          latitud: "",
          longitud: "",
          telefono: "",
          direccion: "",
          imagen: "",
        });
      } else {
        throw new Error(resultAction.payload || "Error al crear la sucursal.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-secondary shadow rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-primary mb-4">
        Crear Nueva Sucursal
      </h2>
      {error && (
        <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">{error}</div>
      )}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-x-4 gap-y-6"
      >
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-primary mb-1">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white"
            placeholder="Nombre de la sucursal"
            required
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-primary mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white"
            placeholder="Correo electrónico"
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-primary mb-1">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white"
            rows="3"
            placeholder="Descripción de la sucursal"
            required
          ></textarea>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-primary mb-1">
            City ID
          </label>
          <input
            type="number"
            name="city_id"
            value={formData.city_id}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white"
            placeholder="ID de la ciudad"
            required
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-primary mb-1">
            Latitud
          </label>
          <input
            type="number"
            step="any"
            name="latitud"
            value={formData.latitud}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white"
            placeholder="Latitud"
            required
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-primary mb-1">
            Longitud
          </label>
          <input
            type="number"
            step="any"
            name="longitud"
            value={formData.longitud}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white"
            placeholder="Longitud"
            required
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-primary mb-1">
            Teléfono
          </label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white"
            placeholder="Teléfono de contacto"
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-primary mb-1">
            Dirección
          </label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-white"
            placeholder="Dirección física"
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-primary mb-1">
            Seleccionar Imagen
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg bg-white"
          />
          {formData.imagen && (
            <p className="text-sm mt-2 text-gray-600">
              Imagen cargada correctamente.
            </p>
          )}
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-button text-white font-semibold py-2 rounded-lg hover:bg-yellow-500 transition"
            disabled={isLoading}
          >
            {isLoading ? "Creando..." : "Crear Sucursal"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateSucursal;
