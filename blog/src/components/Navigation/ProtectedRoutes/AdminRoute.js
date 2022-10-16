import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  //check if user is loggin
  const state = useSelector((state) => state.users);
  const { userAuth } = state;
  const { data: currentUser } = userAuth || {};
  const isAdmin = currentUser?.nhom_nhan_vien_id === "1";

  return isAdmin ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default AdminRoute;
