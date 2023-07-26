import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface GlobalCategories {
  name: string;
  _id: string;
}

export interface Category {
  _id: string;
  name: string;
  photo: string;
  globalCategories: GlobalCategories;
}

interface CategoryState {
  categories: Category[];
  currentCategory: Category | null;
}

const initialState: CategoryState = {
  categories: [],
  currentCategory: null,
};

export const fetchCategories = createAsyncThunk<
  Category[],
  undefined,
  { rejectValue: string }
>("categories/fetch", async (_, { rejectWithValue }) => {
  const res = await fetch(`http://localhost:3010/categories`);

  if (!res.ok) {
    return rejectWithValue("server error");
  }

  return res.json();
});

export const getCurrentCategory = createAsyncThunk<
  Category,
  string,
  { rejectValue: string }
>("current/category/get", async (id, { rejectWithValue }) => {
  const res = await fetch(`http://localhost:3010/categories/${id}`);
  if (!res.ok) {
    return rejectWithValue("server error");
  }

  return res.json();
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCategories.fulfilled,
        (state: CategoryState, action: PayloadAction<Category[]>) => {
          state.categories = action.payload;
        }
      )
      .addCase(
        getCurrentCategory.fulfilled,
        (state: CategoryState, action: PayloadAction<Category>) => {
          state.currentCategory = action.payload;
        }
      );
  },
});

export default categoriesSlice.reducer;
