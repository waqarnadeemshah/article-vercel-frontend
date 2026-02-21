import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { API, setaccesstoken } from "../Api/Api";

export const userarticlelist = createAsyncThunk(
  "api/user/list",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/user/getarticle");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const userarticledetail = createAsyncThunk(
  "api/user/getonearticle/{",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/api/user/getonearticle/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const userlike = createAsyncThunk(
  "api/user/like",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accesstoken");
      if (token) setaccesstoken(token);
      const res = await API.post(`/api/user/likeUnlikepost/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const usercomment = createAsyncThunk(
  "api/user/comment",
  async ({ id, text }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accesstoken");
      if (token) setaccesstoken(token);
      const res = await API.post(`/api/user/postcomment/${id}`, { text });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const getcomment = createAsyncThunk(
  "api/user/view",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/api/user/getcomments/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const sorting = createAsyncThunk(
  "api/user/srting",
  async ({sortby,search}, { rejectWithValue }) => {
    try {
      const res = await API.get(`/api/user/sortingarticle?sort=${sortby}&search=${search}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
const userarticle = createSlice({
  name: "userarticle",
  initialState: {
    loading: false,
    error: null,
    userarticles: [],
    articledetail: null,
    articlescomment: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userarticlelist.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(userarticlelist.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.error = null),
          (state.userarticles = action.payload.articledata));
      })
      .addCase(userarticlelist.rejected, (state, action) => {
        ((state.loading = true), (state.error = action.payload));
      })
      .addCase(userarticledetail.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(userarticledetail.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.error = null),
          (state.articledetail = action.payload.articledata));
      })
      .addCase(userarticledetail.rejected, (state, action) => {
        ((state.loading = true), (state.error = action.payload));
      })
      .addCase(userlike.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(userlike.fulfilled, (state, action) => {
        ((state.loading = false), (state.error = null));
        if (state.articledetail) {
          let like = action.payload.liked;
          if (like) {
            state.articledetail.likesCount += 1;
          } else {
            state.articledetail.likesCount -= 1;
          }
        }
      })
      .addCase(userlike.rejected, (state, action) => {
        ((state.loading = true), (state.error = action.payload));
      })
      .addCase(usercomment.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(usercomment.fulfilled, (state, action) => {
        ((state.loading = false), (state.error = null));
        if (state.articledetail) {
          let comment = action.payload.commentdata;
          if (comment) {
            state.articledetail.commentsCount += 1;
          } else {
            state.articledetail.commentsCount -= 1;
          }
        }
      })
      .addCase(usercomment.rejected, (state, action) => {
        ((state.loading = true), (state.error = action.payload));
      })
      .addCase(getcomment.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(getcomment.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.error = null),
          (state.articlescomment = action.payload.commentdata));
      })
      .addCase(getcomment.rejected, (state, action) => {
        ((state.loading = true), (state.error = action.payload));
      })
      .addCase(sorting.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(sorting.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.error = null),
          (state.userarticles = action.payload.articlesort));
      })
      .addCase(sorting.rejected, (state, action) => {
        ((state.loading = true), (state.error = action.payload));
      });
  },
});
export default userarticle.reducer;
