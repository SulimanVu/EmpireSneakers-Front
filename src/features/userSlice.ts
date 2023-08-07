import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  login: string;
  password: string;
  admin: boolean;
  favorite: string;
  basket: string;
}

interface UserState {
  users: User[];
  user: User;
}

const initialState: UserState = {
  users: [],
  user: {
    _id: "",
    name: "",
    email: "",
    phone: "",
    avatar: "",
    login: "",
    password: "",
    admin: false,
    favorite: "",
    basket: "",
  },
};

export const fetchUsers = createAsyncThunk<
  User[],
  undefined,
  { rejectValue: string }
>("users/fetch", async (_, { rejectWithValue }) => {
  const res = await fetch(`http://localhost:3010/users`);

  if (!res.ok) {
    return rejectWithValue("server error");
  }

  return res.json();
});

export const getUser = createAsyncThunk<
  User,
  { id: string },
  { rejectValue: string }
>("user/get", async ({ id }, { rejectWithValue }) => {
  const res = await fetch(`http://localhost:3010/users/${id}`);

  if (!res.ok) {
    return rejectWithValue("server error");
  }

  return res.json();
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUsers.fulfilled,
        (state: UserState, action: PayloadAction<User[]>) => {
          state.users = action.payload;
        }
      )
      .addCase(
        getUser.fulfilled,
        (state: UserState, action: PayloadAction<User>) => {
          state.user = action.payload;
        }
      );
  },
});

export default userSlice.reducer;
