import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginAPI, getUser } from "../../services/api";

const initialState = {
  token: null, 
  user: null,
  loading: false,
  error: null,
};

// para rehidrata token desde localstorage
const rehydrateToken = () => localStorage.getItem("authToken") || null;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const token = await loginAPI({ email, password }); 
      return token;
    } catch (error) {
      console.error("Error en loginUser:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.error || "Error en el inicio de sesión"
      );
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (email, { rejectWithValue }) => {
    try {
      const user = await getUser(email);
      return user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Error al obtener los datos del usuario"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...initialState,
    token: rehydrateToken(), // cargar token de localStorage (debuggin luego)
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("authToken"); // Eliminar el token al desloguear (debuggin luego)
    },    
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        localStorage.setItem("authToken", action.payload); // Guardar token solo como respaldo (debuggin eliminar luego.)
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
