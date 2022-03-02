import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  productList: [],
  categoryList: [],
  filteredList: [],
};

export const getData = createAsyncThunk("products/getData", async () => {
  const products = await axios.get(
    `https://aveosoft-react-assignment.herokuapp.com/products`
  );
  const category = await axios.get(
    `https://aveosoft-react-assignment.herokuapp.com/categories`
  );
  return { products: products.data, category: category.data };
});
export const productFilterSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    categoryFilter: (state, action) => {
      console.log({ action });
      return {
        ...state,
        filteredList: state.productList.filter(
          (product) => product.categoryId === action.payload
        ),
      };
    },
  },
  extraReducers: {
    [getData.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.productList = action.payload.products;
      state.filteredList = action.payload.products;
      state.categoryList = action.payload.category;
    },
    [getData.pending]: (state) => {
      state.status = "loading";
    },
  },
});
export const { categoryFilter } = productFilterSlice.actions;

export default productFilterSlice.reducer;
