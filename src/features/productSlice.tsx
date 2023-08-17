import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "./categoriesSlice";
import { GlobalCategories } from "./globalCategorySlice";

export interface Product {
  _id: string;
  name: string;
  photo: [string];
  title: string;
  materials: string;
  articul: number;
  price: number;
  categories: Category[];
  globalCategory: GlobalCategories;
  comments: string[];
  rating:number;
  sizes: [{ size: number; quantity: number }];
}

interface ProductState {
  oneProduct:Product | null;
  products: Product[];
  sortedProduct: Product[];
  currentCategory: string;
}

const initialState: ProductState = {
  oneProduct:null,
  products: [],
  sortedProduct: [],
  currentCategory: "",
};

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetch",
  async (_, { rejectWithValue }) => {
    const res = await fetch(`http://localhost:3010/product`);

    if (!res.ok) {
      return rejectWithValue("server error");
    }
   

    return res.json()
  }
);
export const fetchOneProduct = createAsyncThunk<Product,string>(
  "one/products/fetch",
  async (id, { rejectWithValue }) => {
    const res = await fetch(`http://localhost:3010/product/${id}`);

    if (!res.ok) {
      return rejectWithValue("server error");
    }
   

    return res.json()
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
  },
  extraReducers: (builder) => {
    builder
    .addCase(
      fetchProducts.fulfilled,
      (state: ProductState, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.sortedProduct = action.payload;
      }
    )
    .addCase(fetchOneProduct.fulfilled, 
      (state, action,) => {
        state.oneProduct = action.payload
      })
  },
});

export const { filterProduct } = productSlice.actions;
export default productSlice.reducer;
