import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "./userSlice";

interface JwtParse {
  id: string;
  iat: number;
  exp: number;
}

export function parseJwt(token: string) {
  if (token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload) as JwtParse;
  }
  return null;
}

interface UsersState {
  user: User | null;
  users: User[];
  error: boolean;
  token: string | null;
  userId: string | null | undefined;
  loading: boolean;
}

const initialState: UsersState = {
  user: null,
  users: [],
  error: false,
  token: localStorage.getItem("token"),
  userId: localStorage.getItem("token")
    ? parseJwt(localStorage.getItem("token") as string)?.id
    : null,
  loading: false,
};

export const authSignUp = createAsyncThunk<
  User,
  { login: string; password: string }
>("auth/signup", async ({ login, password }, { rejectWithValue }) => {
  try {
    const res = await fetch(`http://localhost:3010/users/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    });

    if (!res.ok) {
      return rejectWithValue("server error");
    }

    return res.json();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const authSignIn = createAsyncThunk<
  { token: string; userId: string | null },
  { login: string; password: string }
>("auth/signin", async ({ login, password }, { rejectWithValue }) => {
  try {
    const res = await fetch("http://localhost:3010/users/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    });

    const token = (await res.json()) as string;

    if (!token) {
      return rejectWithValue(token);
    }

    localStorage.setItem("token", token);
    const decodedToken = parseJwt(token);

    const userId = decodedToken ? decodedToken.id : null;
    return { token, userId };
  } catch (error) {
    return rejectWithValue(error);
  }
});

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // SignUp
      .addCase(authSignUp.pending, (state: UsersState) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(authSignUp.rejected, (state: UsersState) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(
        authSignUp.fulfilled,
        (state: UsersState, action: PayloadAction<User>) => {
          state.error = false;
          state.loading = false;
          state.user = action.payload;
        }
      )
      // SignIn
      .addCase(authSignIn.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(authSignIn.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(
        authSignIn.fulfilled,
        (
          state,
          action: PayloadAction<{ token: string; userId: string | null }>
        ) => {
          state.error = false;
          state.token = action.payload.token;
          state.userId = action.payload.userId;
          state.loading = false;
        }
      );
  },
});

export default applicationSlice.reducer;
