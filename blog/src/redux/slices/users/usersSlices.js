import { createSlice } from "@reduxjs/toolkit";

import {
  fetchUsersAction,
  loginUserAction,
  logoutAction,
  registerUserAction,
  userProfileAction,
} from "./usersActions";

//get user from local storage and place into store
const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//slices
const usersSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: userLoginFromStorage,
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.payload?.error;
    });

    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.error;
      state.serverErr = action?.error?.message;
    });

    //logout
    builder.addCase(logoutAction.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.userAuth = undefined;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.error;
      state.serverErr = action?.error?.message;
    });

    // Profile
    builder.addCase(userProfileAction.pending, (state, action) => {
      state.profileLoading = true;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
    });
    builder.addCase(userProfileAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.profileLoading = false;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
    });
    builder.addCase(userProfileAction.rejected, (state, action) => {
      state.profileAppErr = action?.payload?.error;
      state.profileServerErr = action?.error?.message;
      state.profileLoading = false;
    });

    //All Users
    builder.addCase(fetchUsersAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.usersList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchUsersAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.error;
      state.serverErr = action?.error?.message;
    });

    // // Create
    // builder.addCase(createCategoryAction.pending, (state, action) => {
    //   state.loading = true;
    // });
    // //dispatch action to redirect
    // builder.addCase(resetCategoryAction, (state, action) => {
    //   state.isCreated = true;
    // });
    // builder.addCase(createCategoryAction.fulfilled, (state, action) => {
    //   state.category = action?.payload;
    //   state.isCreated = false;
    //   state.loading = false;
    //   state.appErr = undefined;
    //   state.serverErr = undefined;
    // });
    // builder.addCase(createCategoryAction.rejected, (state, action) => {
    //   state.loading = false;
    //   state.appErr = action?.payload?.message;
    //   state.serverErr = action?.error?.message;
    // });
  },
});

export default usersSlices.reducer;
