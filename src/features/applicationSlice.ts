import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export function parseJwt(token) {
  if (token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  return null;
}

interface Users {
  login: string;
  password: string;
  name: string;
}

interface UsersState {
  users: Users[];
  error: null;
  signIn: boolean;
  signUp: boolean;
  token: string | null;
  userId: string | null;
}

const initialState: UsersState = {
  users: [],
  error: null,
  signIn: false,
  signUp: false,
  token: localStorage.getItem("token"),
  userId: localStorage.getItem("token")
    ? parseJwt(localStorage.getItem("token"))?.id
    : null,
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
      return thunkAPI.rejectWithValue(error);
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
      const decodedToken = parseJwt(token);
      const userId = decodedToken ? decodedToken.id : null;
      return { token, userId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
        state.userId = action.payload.userId;
      });
  },
});
export default applicationSlice.reducer;
