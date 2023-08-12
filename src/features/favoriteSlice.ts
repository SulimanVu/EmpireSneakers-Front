import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../features/productSlice";

export interface IFavorite {
  product: Product;
  size: number;
  _id: string;
}
interface FavoriteState {
  _id: string;
  favorite: IFavorite[];
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
  { id: string; productId: string; size: number }
>("add/favorite", async ({ id, productId, size }, { rejectWithValue }) => {
  const res = await fetch(`http://localhost:3010/favorite/add/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product: productId, size: size }),
  });
  if (!res.ok) {
    return rejectWithValue("server error");
  }

  return res.json();
});

export const deleteToFavorite = createAsyncThunk<
  string,
  { id: string; productId: string; size: number }
>("delete/favorite", async ({ id, productId, size }, { rejectWithValue }) => {
  const res = await fetch(`http://localhost:3010/favorite/delete/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product: productId, size: size }),
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
      )
      .addCase(
        deleteToFavorite.fulfilled,
        (state: FavoriteState, action: PayloadAction<string>) => {
          state.favorite = state.favorite.filter(
            (item) => item.product._id !== action.payload
          );
        }
      );
  },
});

export default favoriteSlice.reducer;
