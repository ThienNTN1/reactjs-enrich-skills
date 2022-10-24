import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./Admin/AdminNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";
import _ from 'lodash';

const Navbar = () => {
  //get user from store
  const user = useSelector(state => state.users);
  const { userAuth } = user || {};
  const isAdmin = userAuth?.nhom_nhan_vien_id === '1';

  console.log('navbar');

  return (
    <>
      {isAdmin ? (
        <AdminNavbar isLogin={userAuth} />
      ) : userAuth ? (
        <PrivateNavbar user={userAuth} />
      ) : (
        <PublicNavbar />
      )}
    </>
  );
};

export default Navbar;
