import { authSignUp, authSignIn } from "./applicationSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Определяем тип для состояния users
interface Users {
  error: null;
  signIn: boolean;
  signUp: boolean;
  token: string | null;
}

// Определяем тип для начального состояния
interface UsersState {
  users: Users[];
  error: null;
}

const initialState: UsersState = {
  users: [
    {
      error: null,
      signIn: false,
      signUp: false,
      token: localStorage.getItem("token"),
    },
  ],
};

export const authSignUp = createAsyncThunk(
  "auth/signup",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3010/users/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const json = await res.json();

      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }
      return json;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSignIn = createAsyncThunk(
  "auth/signin",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3010/users/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const token = await res.json();
      console.log(token);

      if (token.error) {
        return thunkAPI.rejectWithValue(token.error);
      }
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignUp.pending, (state) => {
        state.authSignUp = true;
        state.error = null;
      })
      .addCase(authSignUp.rejected, (state, action) => {
        state.authSignUp = false;
        state.error = action.payload;
      })
      .addCase(authSignUp.fulfilled, (state) => {
        state.authSignUp = false;
        state.error = null;
      })
      .addCase(authSignIn.pending, (state) => {
        state.authSignIn = true;
        state.error = null;
      })
      .addCase(authSignIn.rejected, (state, action) => {
        state.authSignIn = false;
        state.error = action.payload;
      })
      .addCase(authSignIn.fulfilled, (state, action) => {
        state.authSignIn = false;
        state.error = null;
        state.token = action.payload.token;
      });
  },
});
export default applicationSlice.reducer;
