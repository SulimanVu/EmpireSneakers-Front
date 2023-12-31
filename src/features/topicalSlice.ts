import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Topical {
  _id: string;
  slides: [{ img: string; url: string }];
}

interface TopicalState {
  topicals: Topical[];
}

const initialState: TopicalState = {
  topicals: [],
};

export const fetchTopicals = createAsyncThunk<Topical[], string>(
  "topicals/fetch",
  async (id, { rejectWithValue }) => {
    const res = await fetch(`http://localhost:3010/topical/${id}`);
    if (!res.ok) {
      return rejectWithValue("server error");
    }

    return res.json();
  }
);

const topicalSlice = createSlice({
  name: "topical",
  initialState,
  reducers: {},
  extraReducers: (buidler) => {
    buidler.addCase(
      fetchTopicals.fulfilled,
      (state: TopicalState, action: PayloadAction<Topical[]>) => {
        state.topicals = action.payload;
      }
    );
  },
});

export default topicalSlice.reducer;
