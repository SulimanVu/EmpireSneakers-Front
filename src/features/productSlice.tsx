import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface GlobalCategories {
  name: string;
  _id: string;
}

interface Category {
  _id: string;
  name: string;
  photo: string;
  globalCategories: GlobalCategories;
}

interface Product {
  _id: string;
  name: string;
  photo: string;
  title: string;
  materials: string;
  articul: number;
  price: number;
  categories: Category[];
  comments: string[];
  sizes: [{ size: number; quantity: number }];
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, { rejectWithValue }) => {
    const res = await fetch(`http://localhost:3010/product`);

    if (!res.ok) {
      return rejectWithValue("server error");
    }

    return res.json();
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchProducts.fulfilled,
      (state: ProductState, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
      }
    );
  },
});

export default productSlice.reducer;
