import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicView from "./views/PublicView";
import AdminView from "./views/AdminView";
import LoginView from "./views/LoginView";
import NotFoundView from "./views/404view";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicView />} />
        <Route path="/login" element={<LoginView />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminView />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </Router>
  );
}

export default App;
