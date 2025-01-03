import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicView from "./views/PublicView";
import AdminView from "./views/AdminView";
import LoginView from "./views/LoginView";
import NotFoundView from "./views/404view";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
