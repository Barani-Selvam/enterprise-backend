import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Products } from "./pages/Products";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminAddProduct } from "./pages/AdminAddProduct";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Products />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
