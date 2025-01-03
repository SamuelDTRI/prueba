import axiosInstance from "./axiosInstance";

// Get

// sucursales de la empresa especifica con el id de la misma.
export const getBranchDetails = async (companyId) => {
  const response = await axiosInstance.get(`/sucursal/${companyId}`);
  console.log("respuesta de getbranchdetails =", response.data.data);
  return response.data.data;
};

// empresa especifica con su id.
export const getCompanyDetails = async (companyId) => {
  const response = await axiosInstance.get(`/empresa/${companyId}`);
  console.log("respuesta de getcompanydetails =", response.data.data[0]);
  return response.data.data[0];
};

// todas las empresas
export const getCompanies = async () => {
  const response = await axiosInstance.get(`/empresa/1`);
  console.log("Respuesta de getCompanies:", response.data.data);
  return response.data.data;
};

// todos los paises
export const getCountries = async () => {
  const response = await axiosInstance.get("/paises");
  console.log("Respuesta de getCountries:", response.data.data);
  return response.data.data;
};

// departamentos de un pais con su repectivo id (pais.)
export const getDepartments = async (countryId) => {
  const response = await axiosInstance.get(`/departamentos/${countryId}`);
  console.log("Respuesta de getDepartments:", response.data.data);
  return response.data.data;
};

// ciudades de un departamento con su id (departamento)
export const getCities = async (departmentId) => {
  const response = await axiosInstance.get(`/ciudades/${departmentId}`);
  console.log("Respuesta de getCities:", response.data.data);
  return response.data.data;
};

// POST

// Autenticacion de usuario o login
export const login = async ({ email, password }) => {
  try {
    console.log("Intentando iniciar sesión con:", { email, password });
    const response = await axiosInstance.post("/login", {
      email,
      password,
    });
    console.log("Respuesta del servidor (login):", response.data);
    const token = response.data.token;
    localStorage.setItem("authToken", token);
    return token;
  } catch (error) {
    console.error("Error en login:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Error al iniciar sesión");
  }
};


// informacion del usuario
export const getUser = async (email) => {
  const response = await axiosInstance.post("/user", { email });
  return response.data.user;
};

// nueva sucursal
export const createBranch = async (branchData) => {
  const response = await axiosInstance.post("/sucursal", branchData);
  return response.data;
};

// PUT

// actualizar una sucursal con el id de la sucursal
export const updateBranch = async (id, branchData) => {
  const response = await axiosInstance.put(`/sucursal/${id}`, branchData);
  return response.data;
};

// DELETE

// Eliminar una sucursal con el respectivo id de la sucursal.
export const deleteBranch = async (id) => {
  const response = await axiosInstance.delete(`/sucursal/${id}`);
  return response.data;
};
