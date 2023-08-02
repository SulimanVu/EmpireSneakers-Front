import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serverUrl } from "../serverUrl";

export interface Category {
  _id: string;
  name: string;
  photo: string;
}

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

export const fetchCategories = createAsyncThunk<Category[], undefined>(
  "categories/fetch",
  async (_, { rejectWithValue }) => {
    const res = await fetch(`${serverUrl}/categories`);

    if (!res.ok) {
      return rejectWithValue("server error");
    }

    return res.json();
  }
);

export const getCurrentCategory = createAsyncThunk<Category, string>(
  "current/category/get",
  async (id, { rejectWithValue }) => {
    const res = await fetch(`${serverUrl}/categories/${id}`);
    if (!res.ok) {
      return rejectWithValue("server error");
    }

    return res.json();
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchCategories.fulfilled,
      (state: CategoryState, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
      }
    );
  },
});

export default categoriesSlice.reducer;
