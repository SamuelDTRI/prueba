import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-primary text-secondary shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold hover:scale-25 hover:text-yellow-500">
          Buign Design
        </div>

        <div className="md:flex space-x-4">
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-secondary text-primary px-4 py-2 rounded-lg font-medium hover:bg-background transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-secondary text-primary px-4 py-2 rounded-lg font-medium hover:bg-background transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
