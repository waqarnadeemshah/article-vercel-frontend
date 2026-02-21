import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { API, setaccesstoken } from "../Api/Api";
export const createArticle = createAsyncThunk(
  "api/createarticle",
  async (Data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accesstoken");
      if (token) setaccesstoken(token);
      const res = await API.post("/api/admin/addarticle", Data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const listarticle = createAsyncThunk(
  "api/list-article",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accesstoken");
      if (token) setaccesstoken(token);
      const res = await API.get("/api/admin/viewarticle");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const deletearitcle = createAsyncThunk(
  "/api/delaricle",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accesstoken");
      if (token) setaccesstoken(token);
      const res = await API.delete(`/api/admin/deletearticle/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const updatearticle = createAsyncThunk(
  "/api/updatearticle",
  async ({ id, Data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accesstoken");
      if (token) setaccesstoken(token);
      const res = await API.put(`/api/admin/updatearticle/${id}`, Data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
const articleSlice = createSlice({
  name: "article",
  initialState: {
    loading: false,
    error: null,
    articles: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createArticle.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(createArticle.fulfilled, (state) => {
        ((state.loading = false), (state.error = null));
      })
      .addCase(createArticle.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      .addCase(listarticle.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(listarticle.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.error = null),
          (state.articles = action.payload.articledata));
      })
      .addCase(listarticle.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      .addCase(updatearticle.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(updatearticle.fulfilled, (state) => {
        ((state.loading = false), (state.error = null));
      })
      .addCase(updatearticle.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      });
  },
});
export default articleSlice.reducer;
