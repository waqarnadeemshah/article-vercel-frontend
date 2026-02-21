import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { API, setaccesstoken } from "../Api/Api";

export const signup = createAsyncThunk(
  "auth/signup",
  async (FormData, { rejectWithValue }) => {
    try {
      const res = await API.post("/api/auth/signup", FormData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const login = createAsyncThunk(
  "api/login",
  async (FormData, { rejectWithValue }) => {
    try {
      const res = await API.post("/api/auth/login", FormData);
      localStorage.setItem("accesstoken", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.data.userid,
          role: res.data.role,
          name: res.data.name,
        }),
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const logout = createAsyncThunk(
  "api/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.post("/api/auth/logout");
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("user");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const authslice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    token: localStorage.getItem("accesstoken") || null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(signup.fulfilled, (state) => {
        ((state.loading = false), (state.error = null));
      })
      .addCase(signup.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      .addCase(login.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(login.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.error = null),
          (state.user = {
            id: action.payload.userid,
            role: action.payload.role,
            name: action.payload.name,
          }));
        setaccesstoken(action.payload.accesstoken);
      })
      .addCase(login.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      .addCase(logout.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(logout.fulfilled, (state, action) => {
        (state.loading = false),
          (state.user = null),
          (state.token = null),
          (state.error = null);
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      });
  },
});
export default authslice.reducer;
