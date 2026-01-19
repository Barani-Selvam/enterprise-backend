import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/productSlice";
import { fetchCategories } from "../redux/categorySlice";
import type { Category } from "../redux/categorySlice";
import type { RootState, AppDispatch } from "../redux/store";

export const AdminAddProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const categories = useSelector<RootState, Category[]>(
    (s) => s.categories.items
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const submit = () => {
    dispatch(addProduct({ name, price: Number(price), categoryId }));
    alert("Product Added");

    // Clear inputs
    setName("");
    setPrice("");
    setCategoryId(0);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 mt-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <input
        value={name}
        className="border p-2 w-full mb-3"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        value={price}
        className="border p-2 w-full mb-3"
        placeholder="Price"
        type="number"
        onChange={(e) => setPrice(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-3"
        onChange={(e) => setCategoryId(Number(e.target.value))}
      >
        <option value={0}>Select Category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <div className="flex gap-3 mt-4">
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/admin")}
        >
          ← Back to Admin
        </button>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={submit}
        >
          Save Product
        </button>
      </div>
    </div>
  );
};
