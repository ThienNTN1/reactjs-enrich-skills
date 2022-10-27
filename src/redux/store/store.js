import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../slices/category/categorySlice";
import usersReducer from "../slices/users/usersSlices";
import post from "../slices/posts/postSlices";

const store = configureStore({
  reducer: {
    users: usersReducer,
    category: categoriesReducer,
    post,
  },
});

export default store;
