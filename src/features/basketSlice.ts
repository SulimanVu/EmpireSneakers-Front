import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "./productSlice";

export interface IBasket {
  product: Product;
  size: number;
  _id: string;
}

interface BasketState {
  _id: string;
  basket: IBasket[];
}

const initialState = {
  _id: "",
  basket: [],
};

export const fetchBasket = createAsyncThunk<BasketState, { id: string }>(
  "fetch/basket",
  async ({ id }, { rejectWithValue }) => {
    const res = await fetch(`http://localhost:3010/basket/${id}`);
    if (!res.ok) {
      return rejectWithValue("server error");
    }

    return res.json();
  }
);

export const addToBasket = createAsyncThunk<
  BasketState,
  { id: string; productId: string; size: number }
>("add/basket", async ({ id, productId, size }, { rejectWithValue }) => {
  const res = await fetch(`http://localhost:3010/basket/add/${id}`, {
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

export const deleteInBasket = createAsyncThunk<
  string,
  { _id: string; product: string; size: number }
>("delete/InBasket", async ({ _id, product, size }, { rejectWithValue }) => {
  const res = await fetch(`http://localhost:3010/basket/delete/${_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product, size }),
  });
  if (!res.ok) {
    return rejectWithValue("server error");
  }

  return res.json();
});

const basketSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchBasket.fulfilled,
        (state: BasketState, action: PayloadAction<BasketState>) => {
          state.basket = action.payload.basket;
          state._id = action.payload._id;
        }
      )
      .addCase(
        addToBasket.fulfilled,
        (state: BasketState, action: PayloadAction<BasketState>) => {
          state.basket = action.payload.basket;
        }
      )
      .addCase(
        deleteInBasket.fulfilled,
        (state: BasketState, action: PayloadAction<string>) => {
          state.basket = state.basket.filter(
            (item) => item.product._id !== action.payload
          );
        }
      );
  },
});

export default basketSlice.reducer;
