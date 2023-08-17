import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "./categoriesSlice";
import { GlobalCategories } from "./globalCategorySlice";

export interface Product {
  _id: string;
  name: string;
  photo: string;
  title: string;
  materials: string;
  articul: number;
  price: number;
  categories: Category[];
  globalCategory: GlobalCategories;
  comments: string[];
  sizes: [{ size: number; quantity: number }];
}

interface ProductState {
  products: Product[];
  sortedProduct: Product[];
  currentCategory: string;
}

const initialState: ProductState = {
  products: [],
  sortedProduct: [],
  currentCategory: "",
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
  reducers: {
    filterProduct(state, action: PayloadAction<string>) {
      state.sortedProduct = state.products.filter((product) =>
        product.categories.find((category) => category._id === action.payload)
      );
      state.currentCategory = action.payload;
    },
    priceFilter(state, action: PayloadAction<{ min: number; max: number }>) {
      const sortWithCategory = state.products.filter((product) =>
        product.categories.find(
          (category) => category._id === state.currentCategory
        )
      );

      sortWithCategory.length > 0
        ? (state.sortedProduct = sortWithCategory.filter(
            (product) =>
              product.price > action.payload.min &&
              product.price < action.payload.max
          ))
        : (state.sortedProduct = state.products.filter(
            (product) =>
              product.price > action.payload.min &&
              product.price < action.payload.max
          ));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProducts.fulfilled,
      (state: ProductState, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.sortedProduct = action.payload;
      }
    );
  },
});

export const { filterProduct, priceFilter } = productSlice.actions;
export default productSlice.reducer;
