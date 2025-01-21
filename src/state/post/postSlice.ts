import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post, PostData, PostStoreState } from "../../types/post";
import { postService } from "./postApi";
import { ALERT_TYPE } from "../alert/alertTypes";
import { setAlert } from "../alert/alertSlice";

export const fetchPosts = createAsyncThunk(
  "posts/fetch",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      return await postService.fetchPosts();
    } catch (error: any) {
      dispatch(
        setAlert({
          message: "Failed to fetch posts",
          type: ALERT_TYPE.DANGER,
        })
      );
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchPost = createAsyncThunk(
  "post/fetch",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      return await postService.fetchPost(id);
    } catch (error: any) {
      dispatch(
        setAlert({
          message: "Failed to fetch post",
          type: ALERT_TYPE.DANGER,
        })
      );
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPost = createAsyncThunk(
  "post/create",
  async (postData: PostData, { rejectWithValue, dispatch }) => {
    try {
      return await postService.createPost(postData);
    } catch (error: any) {
      dispatch(
        setAlert({
          message: "Failed to create post",
          type: ALERT_TYPE.DANGER,
        })
      );
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/update",
  async (post: Post, { rejectWithValue, dispatch }) => {
    try {
      return await postService.updatePost(post);
    } catch (error: any) {
      dispatch(
        setAlert({
          message: "Failed to update post",
          type: ALERT_TYPE.DANGER,
        })
      );
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/delete",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      return await postService.deletePost(id);
    } catch (error: any) {
      dispatch(
        setAlert({
          message: "Failed to delete post",
          type: ALERT_TYPE.DANGER,
        })
      );
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: PostStoreState = {
  posts: [],
  selectedPost: null,
  loading: true,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch posts";
    });
  },
});

export const { setSelectedPost } = postSlice.actions;
export default postSlice.reducer;
