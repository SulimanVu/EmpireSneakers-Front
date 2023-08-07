import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../features/productSlice";

interface FavoriteState {
  _id: string;
  favorite: Product[];
}

const initialState = {
  _id: "",
  favorite: [],
};

export const fetchFavorites = createAsyncThunk<FavoriteState, { id: string }>(
  "fetch/favorites",
  async ({ id }, { rejectWithValue }) => {
    const res = await fetch(`http://localhost:3010/favorite/${id}`);
    if (!res.ok) {
      return rejectWithValue("server error");
    }

    return res.json();
  }
);

export const addToFavorite = createAsyncThunk<
  FavoriteState,
  { id: string; productId: string }
>("add/favorite", async ({ id, productId }, { rejectWithValue }) => {
  const res = await fetch(`http://localhost:3010/favorite/add/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ favorite: productId }),
  });
  if (!res.ok) {
    return rejectWithValue("server error");
  }

  return res.json();
});

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchFavorites.fulfilled,
        (state: FavoriteState, action: PayloadAction<FavoriteState>) => {
          state.favorite = action.payload.favorite;
          state._id = action.payload._id;
        }
      )
      .addCase(
        addToFavorite.fulfilled,
        (state: FavoriteState, action: PayloadAction<FavoriteState>) => {
          state.favorite = action.payload.favorite;
        }
      );
  },
});

export default favoriteSlice.reducer;
