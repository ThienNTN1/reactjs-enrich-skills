import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import _ from "lodash";

const PrivateProtectRoute = ({ component: Component, ...rest }) => {
  // Check if user is loggin
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;

  return userAuth ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateProtectRoute;
