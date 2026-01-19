import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const { token, username, role, logout } = useContext(AuthContext);

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between">
      <span className="font-bold text-lg">Enterprise Digital</span>

      <div className="flex items-center gap-4">
        {token && (
          <span className="text-sm text-green-300">
            Welcome, {role === "Admin" ? "Admin" : username?.split("@")[0]}
          </span>
        )}

        <a href="/" className="hover:text-blue-400">
          Products
        </a>

        {!token && <a href="/login">Login</a>}

        {!token && (
          <Link to="/register" className="hover:text-blue-400">
            Register
          </Link>
        )}

        {token && (
          <button
            onClick={logout}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        )}

        {role === "Admin" && <a href="/admin">Admin</a>}
      </div>
    </nav>
  );
};
