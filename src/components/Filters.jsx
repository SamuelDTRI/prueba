import React from "react";

const Filters = ({
  selectedCompany,
  selectedCountry,
  onCountryChange,
  selectedDepartment,
  onDepartmentChange,
  selectedCity,
  onCityChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="bg-secondary text-secondary p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-primary mb-4 transition-transform transform hover:scale-25 hover:text-yellow-500 text-center">
        Filtros
      </h2>
      <div className="flex flex-col md:flex-wrap md:justify-center md:items-center lg:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar sucursales..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full lg:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-button transition-shadow text-primary bg-white"
        />

        <select
          className="w-full lg:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-button transition-shadow text-primary bg-white"
          value={selectedCountry || ""}
          onChange={(e) => onCountryChange(e.target.value)}
          disabled={!selectedCompany}
        >
          <option value="">Seleccionar país</option>
          <option value="58">Czech Republic</option>
          <option value="48">Colombia</option>
        </select>

        <select
          className="w-full lg:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-button transition-shadow text-primary bg-white"
          value={selectedDepartment || ""}
          onChange={(e) => onDepartmentChange(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="">Seleccionar departamento</option>
          <option value="4576">Ústecký kraj</option>
          <option value="2875">Cundinamarca</option>
        </select>

        <select
          className="w-full lg:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-button transition-shadow text-primary bg-white"
          value={selectedCity || ""}
          onChange={(e) => onCityChange(e.target.value)}
          disabled={!selectedDepartment}
        >
          <option value="">Seleccionar ciudad</option>
          <option value="22183">Bystřany</option>
          <option value="20705">Chía</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
