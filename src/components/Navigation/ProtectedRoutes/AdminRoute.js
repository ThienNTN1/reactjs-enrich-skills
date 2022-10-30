import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import _ from 'lodash';

const AdminRoute = ({ component: Component, ...rest }) => {
  // Check if user is loggin
  const user = useSelector((state) => state.users);
  const userAuth = _.get(user, 'userAuth.data', {})

  const isAdmin = userAuth?.nhom_nhan_vien_id === "1";

  return isAdmin ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default AdminRoute;
