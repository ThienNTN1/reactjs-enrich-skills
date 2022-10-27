import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";
import { renameKeys } from "../../../utils/mapper";

//register action
export const registerUserAction = createAsyncThunk(
  "user/regUser",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const newKeys = {
      email: "email",
      firstName: "ten_tai_khoan",
      lastName: "ten_nhan_vien",
      password: "mat_khau",
    };
    const renamedUser = renameKeys(user, newKeys);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/user/regUser`,
        renamedUser,
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Login
export const loginUserAction = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      //make http call
      const { data } = await axios.post(
        `${baseUrl}/api/user/login`,
        userData,
        config
      );
      //save user into local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Logout action
export const logoutAction = createAsyncThunk(
  "/user/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Profile
export const userProfileAction = createAsyncThunk(
  "user/profile",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(`${baseUrl}/api/user/${id}`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all users
export const fetchUsersAction = createAsyncThunk(
  "user/list",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(`${baseUrl}/api/users`, config);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

// //action to redirect
// export const resetEditAction = createAction("category/reset");
// export const resetDeleteAction = createAction("category/delete-reset");
// export const resetUserAction = createAction("user/created-reset");

// // Create
// export const createUserAction = createAsyncThunk(
//   "user/create",
//   async (user, { rejectWithValue, getState, dispatch }) => {
//     // Get user token
//     const state = getState()?.users;
//     const { userAuth } = state;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${userAuth?.token}`,
//       },
//     };
//     // http call
//     try {
//       const { data } = await axios.post(
//         `${baseUrl}/api/user`,
//         {
//           ...user,
//         },
//         config
//       );
//       // Dispatch action
//       dispatch(resetUserAction());
//       return data;
//     } catch (error) {
//       if (!error?.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

// //Update
// export const updateUserAction = createAsyncThunk(
//   "user/update",
//   async (user, { rejectWithValue, getState, dispatch }) => {
//     //get user token
//     const state = getState()?.users;
//     const { userAuth } = state;
//     const config = {
//       headers: {
//         Authorization: `Bearer ${userAuth?.token}`,
//       },
//     };
//     //http call
//     try {
//       const { data } = await axios.put(
//         `${baseUrl}/api/user/${user?.id}`,
//         { ten_nhom: category?.title },
//         config
//       );
//       //dispatch ation to reset the updated data
//       dispatch(resetEditAction());
//       return data;
//     } catch (error) {
//       if (!error?.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );