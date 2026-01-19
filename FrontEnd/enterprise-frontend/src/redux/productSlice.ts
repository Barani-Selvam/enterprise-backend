import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  category?: {
    id: number;
    name: string;
  };
}

export interface UpdateProductDto {
  id: number;
  name: string;
  price: number;
  categoryId: number;
}

interface ProductState {
  items: Product[];
}

const initialState: ProductState = { items: [] };

/* Fetch products */
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetch",
  async () => {
    const res = await api.get<Product[]>("/products");
    return res.data;
  }
);

/* Add product */
export const addProduct = createAsyncThunk<Product, Omit<Product, "id">>(
  "products/add",
  async (product) => {
    const res = await api.post<Product>("/products", product);
    return res.data;
  }
);

// add thunks
export const updateProduct = createAsyncThunk<Product, UpdateProductDto>(
  "products/update",
  async (dto, { dispatch }) => {
    await api.put(`/products/${dto.id}`, dto);
    // reload full products with category
    dispatch(fetchProducts());

    return dto as Product;
  }
);

export const deleteProduct = createAsyncThunk<number, number>(
  "products/delete",
  async (id) => {
    await api.delete(`/products/${id}`);
    return id;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });

    // builder.addCase(updateProduct.fulfilled, (state, action) => {
    //   const idx = state.items.findIndex((p) => p.id === action.payload.id);
    //   if (idx >= 0) state.items[idx] = action.payload;
    // });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    });
  },
});

export default productSlice.reducer;
