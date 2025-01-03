import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import branchReducer from "./slices/branchesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, 
    branches: branchReducer, 
  },
});

export default store;
