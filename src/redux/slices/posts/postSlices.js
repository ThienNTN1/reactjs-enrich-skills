import { createSlice } from "@reduxjs/toolkit";

import {
  createpostAction,
  deletePostAction,
  fetchPostDetailsAction,
  fetchPostsAction,
  resetPost,
  resetPostDelete,
  resetPostEdit,
  toggleAddDisLikesToPost,
  toggleAddLikesToPost,
  updatePostAction,
} from "./postActions";

//slice
const postSlice = createSlice({
  name: "post",
  initialState: {},
  extraReducers: (builder) => {
    //create post
    builder.addCase(createpostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPost, (state, action) => {
      state.isCreated = true;
    });
    builder.addCase(createpostAction.fulfilled, (state, action) => {
      state.postCreated = action?.payload;
      state.loading = false;
      state.isCreated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createpostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.error;
      state.serverErr = action?.error?.message;
    });

    //Update post
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPostEdit, (state, action) => {
      state.isUpdated = true;
    });
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.postUpdated = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isUpdated = false;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.error;
      state.serverErr = action?.error?.message;
    });

    //Delete post
    builder.addCase(deletePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPostDelete, (state, action) => {
      state.isDeleted = true;
    });
    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.postUpdated = action?.payload;
      state.isDeleted = false;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deletePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //fetch posts
    builder.addCase(fetchPostsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
      state.postLists = action?.payload?.data;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //fetch post Details
    builder.addCase(fetchPostDetailsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPostDetailsAction.fulfilled, (state, action) => {
      state.postDetails = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.error;
      state.serverErr = action?.error?.message;
    });
    //Likes
    builder.addCase(toggleAddLikesToPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(toggleAddLikesToPost.fulfilled, (state, action) => {
      state.likes = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(toggleAddLikesToPost.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //DisLikes
    builder.addCase(toggleAddDisLikesToPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(toggleAddDisLikesToPost.fulfilled, (state, action) => {
      state.dislikes = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(toggleAddDisLikesToPost.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default postSlice.reducer;
