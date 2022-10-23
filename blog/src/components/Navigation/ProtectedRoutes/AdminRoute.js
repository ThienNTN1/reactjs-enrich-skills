import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ component: Component, ...rest }) => {
  // Check if user is loggin
  const user = useSelector((state) => state.users);
  const {
    userAuth: { data: currentUser },
  } = user || {};
  const isAdmin = currentUser?.nhom_nhan_vien_id === "1";

  return isAdmin ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default AdminRoute;
