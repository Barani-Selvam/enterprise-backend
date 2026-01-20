import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export interface Category {
  id: number;
  name: string;
}

interface CategoryState {
  items: Category[];
}

const initialState: CategoryState = { items: [] };

export const fetchCategories = createAsyncThunk<Category[]>(
  "categories/fetch",
  async () => {
    const res = await api.get<Category[]>("/api/categories");
    return res.data;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default categorySlice.reducer;
