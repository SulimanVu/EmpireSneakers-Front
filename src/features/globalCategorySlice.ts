import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface GlobalCategories {
  name: string;
  _id: string;
}

interface GlobalCategoriesState {
  globalCategories: GlobalCategories[];
  loading: boolean;
  isError: boolean;
}

const initialState: GlobalCategoriesState = {
  globalCategories: [],
  loading: false,
  isError: false,
};

export const fetchGlobalCategories = createAsyncThunk<
  GlobalCategories[],
  undefined,
  { rejectValue: string }
>("global/fetch", async (_, { rejectWithValue }) => {
  const res = await fetch(`http://localhost:3010/globalCategories`);

  if (!res.ok) {
    return rejectWithValue("server error");
  }

  return res.json();
});

const globalCategoriesSlice = createSlice({
  name: "globalCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchGlobalCategories.fulfilled,
        (
          state: GlobalCategoriesState,
          action: PayloadAction<GlobalCategories[]>
        ) => {
          state.globalCategories = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchGlobalCategories.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchGlobalCategories.rejected, (state) => {
        state.loading = false;
        state.isError = true;
      });
  },
});

export default globalCategoriesSlice.reducer;
