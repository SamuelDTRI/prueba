import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

const initialState = {
  branches: [],
  loading: false,
  error: null,
};

// sucursales con el app_id del usuario
export const fetchBranches = createAsyncThunk(
  "branches/fetchBranches",
  async (appId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/sucursal/${appId}`);
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al obtener las sucursales."
      );
    }
  }
);

// crear nueva sucursal
export const addBranch = createAsyncThunk(
  "branches/addBranch",
  async (branchData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/sucursal", branchData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al agregar la sucursal."
      );
    }
  }
);

// actualizar sucursal
export const updateBranch = createAsyncThunk(
  "branches/updateBranch",
  async ({ id, branchData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/sucursal/${id}`, branchData);
      return response.data;
    } catch (error) {
      // (debuggin)
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || "Error al actualizar la sucursal.";
      return rejectWithValue(errorMessage);
    }
  }
);

// eliminar sucursal
export const deleteBranch = createAsyncThunk(
  "branches/deleteBranch",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/sucursal/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error al eliminar la sucursal."
      );
    }
  }
);

const branchesSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBranch.fulfilled, (state, action) => {
        state.branches.push(action.payload);
      })
      .addCase(updateBranch.fulfilled, (state, action) => {
        const index = state.branches.findIndex(
          (branch) => branch.id === action.payload.id
        );
        if (index !== -1) state.branches[index] = action.payload;
      })
      .addCase(deleteBranch.fulfilled, (state, action) => {
        state.branches = state.branches.filter(
          (branch) => branch.id !== action.payload
        );
      });
  },
});

export default branchesSlice.reducer;
