import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBranches,
  updateBranch,
  deleteBranch,
} from "../redux/slices/branchesSlice";

function ListSucursales({ appId }) {
  const dispatch = useDispatch();
  const { branches, loading, error } = useSelector((state) => state.branches);
  const [editingBranch, setEditingBranch] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (appId) {
      dispatch(fetchBranches(appId));
    }
  }, [dispatch, appId]);

  const validateField = (name, value) => {
    switch (name) {
      case "nombre":
        return value?.trim() ? "" : "El nombre es requerido";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Email inválido";
      case "descripcion":
        return value?.trim() ? "" : "La descripción es requerida";
      case "city_id":
        return !isNaN(value) && parseInt(value) > 0 ? "" : "Ciudad inválida";
      case "latitud":
        return !isNaN(value) &&
          parseFloat(value) >= -90 &&
          parseFloat(value) <= 90
          ? ""
          : "Latitud debe estar entre -90 y 90";
      case "longitud":
        return !isNaN(value) &&
          parseFloat(value) >= -180 &&
          parseFloat(value) <= 180
          ? ""
          : "Longitud debe estar entre -180 y 180";
      case "telefono":
        return /^\+?[\d\s-]{8,}$/.test(value) ? "" : "Teléfono inválido";
      case "direccion":
        return value?.trim() ? "" : "La dirección es requerida";
      default:
        return "";
    }
  };

  const handleEdit = (branch) => {
    setEditingBranch(branch.id);
    setEditForm(branch);
    setFormErrors({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      "nombre",
      "email",
      "descripcion",
      "city_id",
      "latitud",
      "longitud",
      "telefono",
      "direccion",
    ];

    requiredFields.forEach((field) => {
      const error = validateField(field, editForm[field]);
      if (error) {
        errors[field] = error;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    try {
      if (!validateForm()) {
        alert("Por favor corrija los errores en el formulario");
        return;
      }

      const apiPayload = {
        nombre: editForm.nombre.trim(),
        email: editForm.email.trim(),
        descripcion: editForm.descripcion.trim(),
        city_id: parseInt(editForm.city_id, 10),
        latitud: parseFloat(editForm.latitud),
        longitud: parseFloat(editForm.longitud),
        telefono: editForm.telefono.trim(),
        direccion: editForm.direccion.trim(),
      };

      if (editForm.imagen?.trim()) {
        if (!/^data:image\/[a-z]+;base64,/.test(editForm.imagen)) {
          setFormErrors((prev) => ({
            ...prev,
            imagen: "La imagen debe estar en formato base64",
          }));
          return;
        }
        apiPayload.imagen = editForm.imagen.trim();
      }

      console.log("Payload formateado enviado al backend:", apiPayload);

      await dispatch(
        updateBranch({ id: editingBranch, branchData: apiPayload })
      );

      alert("Sucursal actualizada con éxito.");
      setEditingBranch(null);
      setFormErrors({});
    } catch (error) {
      console.error("Error al actualizar la sucursal:", error);
      if (error.response?.data) {
        console.error("Detalles del error:", error.response.data);
        alert(
          `Error: ${
            error.response.data.message || "Error al actualizar la sucursal"
          }`
        );
      } else {
        alert("Error al actualizar la sucursal.");
      }
    }
  };

  const handleCancel = () => {
    setEditingBranch(null);
    setFormErrors({});
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta sucursal?")) {
      dispatch(deleteBranch(id));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setEditForm((prev) => ({
          ...prev,
          imagen: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <p className="text-primary">Cargando sucursales...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 bg-secondary shadow rounded-lg">
      <h2 className="text-2xl font-semibold text-primary mb-4">Sucursales</h2>
      {branches.length === 0 ? (
        <p>No hay sucursales registradas.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              {editingBranch === branch.id ? (
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">Editar Sucursal</h3>
                  <div className="grid gap-4">
                    <div>
                      <input
                        type="text"
                        name="nombre"
                        value={editForm.nombre || ""}
                        onChange={handleEditChange}
                        className={`w-full px-4 py-2 border rounded-lg text-primary bg-white ${
                          formErrors.nombre
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Nombre"
                      />
                      {formErrors.nombre && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.nombre}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        value={editForm.email || ""}
                        onChange={handleEditChange}
                        className={`w-full px-4 py-2 border rounded-lg text-primary bg-white ${
                          formErrors.email
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Email"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <textarea
                        name="descripcion"
                        value={editForm.descripcion || ""}
                        onChange={handleEditChange}
                        className={`w-full px-4 py-2 border rounded-lg text-primary bg-white ${
                          formErrors.descripcion
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Descripción"
                      ></textarea>
                      {formErrors.descripcion && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.descripcion}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        name="city_id"
                        value={editForm.city_id || ""}
                        onChange={handleEditChange}
                        className={`w-full px-4 py-2 border rounded-lg text-primary bg-white ${
                          formErrors.city_id
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="ID de la Ciudad"
                      />
                      {formErrors.city_id && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.city_id}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        name="latitud"
                        value={editForm.latitud || ""}
                        onChange={handleEditChange}
                        className={`w-full px-4 py-2 border rounded-lg text-primary bg-white ${
                          formErrors.latitud
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Latitud"
                      />
                      {formErrors.latitud && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.latitud}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        name="longitud"
                        value={editForm.longitud || ""}
                        onChange={handleEditChange}
                        className={`w-full px-4 py-2 border rounded-lg text-primary bg-white ${
                          formErrors.longitud
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Longitud"
                      />
                      {formErrors.longitud && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.longitud}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        name="telefono"
                        value={editForm.telefono || ""}
                        onChange={handleEditChange}
                        className={`w-full px-4 py-2 border rounded-lg text-primary bg-white ${
                          formErrors.telefono
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Teléfono"
                      />
                      {formErrors.telefono && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.telefono}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        name="direccion"
                        value={editForm.direccion || ""}
                        onChange={handleEditChange}
                        className={`w-full px-4 py-2 border rounded-lg text-primary bg-white ${
                          formErrors.direccion
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Dirección"
                      />
                      {formErrors.direccion && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.direccion}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">
                        Seleccionar Imagen
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border rounded-lg bg-white"
                      />
                      {formErrors.imagen && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.imagen}
                        </p>
                      )}
                      {editForm.imagen && (
                        <p className="text-sm mt-2 text-gray-600">
                          Imagen cargada correctamente.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <h3 className="text-xl font-bold">{branch.nombre}</h3>
                  <p className="text-gray-700 mt-2">{branch.descripcion}</p>
                  <p className="text-gray-600 mt-1">{branch.email}</p>
                  <p className="text-gray-600">{branch.telefono}</p>
                  <p className="text-gray-600">{branch.direccion}</p>
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => handleEdit(branch)}
                      className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(branch.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListSucursales;
