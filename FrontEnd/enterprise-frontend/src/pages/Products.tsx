import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  updateProduct,
  deleteProduct,
} from "../redux/productSlice";
import { fetchCategories } from "../redux/categorySlice";
import type { Product } from "../redux/productSlice";
import type { Category } from "../redux/categorySlice";
import type { RootState, AppDispatch } from "../redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Products: React.FC = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const navigate = useNavigate();

  const [successType, setSuccessType] = useState<"register" | "login" | null>(
    location.state?.registered
      ? "register"
      : location.state?.loginSuccess
      ? "login"
      : null
  );

  useEffect(() => {
    if (successType === "login" || successType === "register") {
      const timer = setTimeout(() => {
        setSuccessType(null);

        // Clear router state so refresh won't show message again
        navigate(".", { replace: true, state: {} });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successType, navigate]);

  const { role } = useContext(AuthContext);

  const isAdmin = role === "Admin";

  const [editing, setEditing] = useState<Product | null>(null);

  const startEdit = (p: Product) => setEditing(p);
  const cancelEdit = () => setEditing(null);

  const saveEdit = () => {
    if (!editing) return;
    dispatch(
      updateProduct({
        id: editing.id,
        name: editing.name,
        price: editing.price,
        categoryId: editing.categoryId,
      })
    );
    setEditing(null);
  };

  const removeProduct = (id: number) => {
    if (confirm("Delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector<RootState, Product[]>((s) => s.products.items);

  const categories = useSelector<RootState, Category[]>(
    (s) => s.categories.items
  );

  const [filterCategoryId, setFilterCategoryId] = useState<number>(0);

  const [filterPriceRange, setFilterPriceRange] = useState<string>("all");

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
  setCurrentPage(1);
}, [filterCategoryId, filterPriceRange]);

  const filteredProducts = products.filter((p) => {
  const categoryMatch =
    filterCategoryId === 0 || p.categoryId === filterCategoryId;

  let priceMatch = true;

  switch (filterPriceRange) {
    case "0-500":
      priceMatch = p.price >= 0 && p.price <= 500;
      break;
    case "500-1000":
      priceMatch = p.price > 500 && p.price <= 1000;
      break;
    case "1000-1500":
      priceMatch = p.price > 1000 && p.price <= 1500;
      break;
    case "1500+":
      priceMatch = p.price > 1500;
      break;
    default:
      priceMatch = true;
  }

  return categoryMatch && priceMatch;
});

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Products</h2>

      {successType && (
        <div className="mb-4 p-4 rounded bg-green-100 text-green-800 border border-green-300 flex justify-between items-center">
          <span className="font-semibold">
            {successType === "register"
              ? "🎉 Registration completed successfully!"
              : "✅ Login successful!"}
          </span>

          <button className="font-bold" onClick={() => setSuccessType(null)}>
            ×
          </button>
        </div>
      )}

      <div className="mb-4 flex gap-6 items-center">
  {/* Category Filter */}
  <div>
    <label className="mr-2 font-semibold">Category:</label>
    <select
      className="border p-2 rounded"
      value={filterCategoryId}
      onChange={(e) => setFilterCategoryId(Number(e.target.value))}
    >
      <option value={0}>All</option>
      {categories.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  </div>

  {/* Price Filter */}
  <div>
    <label className="mr-2 font-semibold">Price:</label>
    <select
      className="border p-2 rounded"
      value={filterPriceRange}
      onChange={(e) => setFilterPriceRange(e.target.value)}
    >
      <option value="all">All</option>
      <option value="0-500">₹0 – ₹500</option>
      <option value="500-1000">₹500 – ₹1000</option>
      <option value="1000-1500">₹1000 – ₹1500</option>
      <option value="1500+">₹1500+</option>
    </select>
  </div>
</div>

      <table className="min-w-full border rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="text-left">Name</th>
            <th className="text-left">Category</th>
            <th className="text-left">Price</th>
            {isAdmin && <th className="text-left">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((p, index) => (
            <tr key={p.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{index + 1}</td>
              <td>{p.name}</td>
              <td>
                <span className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded">
                  {p.category?.name}
                </span>
              </td>
              <td>₹{p.price.toLocaleString("en-IN")}</td>
              <td>
                {isAdmin && (
                  <div className="flex gap-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() => startEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => removeProduct(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}

          {filteredProducts.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded ${
              currentPage === page ? "bg-blue-600 text-white" : ""
            }`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-bold mb-3">Edit Product</h3>

            <input
              className="border p-2 w-full mb-2"
              value={editing.name}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })}
            />

            <input
              className="border p-2 w-full mb-2"
              type="number"
              value={editing.price}
              onChange={(e) =>
                setEditing({ ...editing, price: Number(e.target.value) })
              }
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-400 px-3 py-1 rounded"
                onClick={cancelEdit}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded"
                onClick={saveEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
