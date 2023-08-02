import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export function parseJwt(token:string) {
  if (token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
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
  error:string | null;
  signIn: boolean;
  signUp: boolean;
  token: string | null;
  userId: string | null;
  loading:boolean;
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
    loading:false,
};




export const authSignUp = createAsyncThunk<
Users[],
{ login: string; password: string }
>(
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

export const authSignIn = createAsyncThunk<
{ token: string; userId: string | null },
{ login: string; password: string }
>(
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
      const token = await res.json() as string;

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
        state.authSignUp = false;
        state.error = null;
        state.loading = true
      })
      .addCase(authSignUp.rejected, (state, action) => {
        state.authSignUp = false;
        state.error = action.payload;
        state.loading = false
      })
      .addCase(authSignUp.fulfilled, (state:UsersState) => {
        state.authSignUp = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(authSignIn.pending, (state) => {
        state.authSignIn = false;
        state.error = null;
        state.loading = true
      })
      .addCase(authSignIn.rejected, (state, action) => {
        state.authSignIn = false;
        state.error = action.payload;
        state.loading = false
      })
      .addCase(authSignIn.fulfilled, (state, action: PayloadAction<{ token: string; userId: string | null }>) => {
        state.authSignIn = true;
        state.error = null;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.loading = false
        console.log(action.userId);
        
      });
  },
});
export default applicationSlice.reducer;
