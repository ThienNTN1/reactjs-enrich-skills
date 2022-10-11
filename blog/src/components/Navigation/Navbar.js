import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./Admin/AdminNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";

const Navbar = () => {
  //get user from store
  const state = useSelector(state => state.users);
  const { userAuth } = state;
  const {data: currentUser} = userAuth || {};
  const isAdmin = currentUser?.nhom_nhan_vien_id === '1';
  console.log('userAuth', isAdmin );

  return (
    <>
      {isAdmin ? (
        <AdminNavbar isLogin={currentUser} />
      ) : currentUser ? (
        <PrivateNavbar isLogin={currentUser} />
      ) : (
        <PublicNavbar />
      )}
    </>
  );
};

export default Navbar;
