import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Filters from "../components/Filters";
import Cards from "../components/Cards";
import { getBranchDetails, getCompanyDetails } from "../services/api";

const PublicView = () => {
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  const [selectedCompany, setSelectedCompany] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [companyDetails, setCompanyDetails] = useState(null);

  // Cargar información de la empresa
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const data = await getCompanyDetails(selectedCompany);
        setCompanyDetails(data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar la información de la empresa:", err);
        setError("No se pudo cargar la información de la empresa.");
      }
    };
    fetchCompanyDetails();
  }, [selectedCompany]);

  // Cargar sucursales al iniciar
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const data = await getBranchDetails(selectedCompany);
        setBranches(data);
        setFilteredBranches(data.slice(0, 10)); // Limitar a 10 sucursales
        setError(null);
      } catch (err) {
        console.error("Error al cargar sucursales:", err);
        setError("No se pudieron cargar las sucursales.");
      }
    };
    fetchBranches();
  }, [selectedCompany]);

  // Aplicar filtros en tiempo real
  useEffect(() => {
    let filtered = [...branches];

    if (selectedCountry) {
      filtered = filtered.filter(
        (branch) => branch.pais_id === parseInt(selectedCountry)
      );
    }

    if (selectedDepartment) {
      filtered = filtered.filter(
        (branch) => branch.estado_id === parseInt(selectedDepartment)
      );
    }

    if (selectedCity) {
      filtered = filtered.filter(
        (branch) => branch.ciudad_id === parseInt(selectedCity)
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (branch) =>
          branch.nombre.toLowerCase().includes(query) ||
          branch.descripcion.toLowerCase().includes(query) ||
          branch.direccion.toLowerCase().includes(query) ||
          branch.telefono.toLowerCase().includes(query) ||
          branch.pais.toLowerCase().includes(query) ||
          branch.estado.toLowerCase().includes(query) ||
          branch.ciudad.toLowerCase().includes(query)
      );
    }

    setFilteredBranches(filtered.slice(0, 10));
  }, [
    selectedCountry,
    selectedDepartment,
    selectedCity,
    searchQuery,
    branches,
  ]);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        {companyDetails && (
          <div className="bg-gradient-to-r from-primary to-thirt shadow-md rounded-lg overflow-hidden mb-6 p-6 text-secondary">
            <div className="flex items-center gap-4">
              <img
                src="https://via.placeholder.com/100x100"
                alt="Logo Empresa"
                className="w-24 h-24 rounded-full border-2 border-secondary shadow-md"
              />
              <div>
                <h2 className="text-2xl font-bold">{companyDetails.cod_app}</h2>
                <p className="text-sm italic">{companyDetails.descripcion}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm">
                <span className="font-semibold">Contacto:</span>{" "}
                {companyDetails.email_contacto} |{" "}
                {companyDetails.telefono_contacto_es}
              </p>
              <a
                href={companyDetails.link_terminos_condiciones_es}
                target="_blank"
                rel="noopener noreferrer"
                className="text-background hover:text-white underline mt-2 block transition-colors duration-300"
              >
                Términos y condiciones
              </a>
            </div>
          </div>
        )}

        <Filters
          selectedCompany={selectedCompany}
          onCompanyChange={setSelectedCompany}
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <h1 className="text-4xl font-extrabold text-primary mb-6 transition-transform transform hover:scale-25 hover:text-yellow-500 text-center mt-10">
          Sucursales Disponibles
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        {filteredBranches.length > 0 ? (
          <Cards branches={filteredBranches} />
        ) : (
          <p className="text-gray-500">
            No hay sucursales que coincidan con los filtros seleccionados.
          </p>
        )}
      </div>
    </div>
  );
};

export default PublicView;
