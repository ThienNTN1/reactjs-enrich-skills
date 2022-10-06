import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./Admin/AdminNavbar";
import PublicNavbar from "./Public/PublicNavbar";

const Navbar = () => {
  //get user from store
  const state = useSelector(state => state.users);
  const { userAuth } = state;
  const {data: currentUser} = userAuth;

  return (
    <>
      {!!currentUser ? <AdminNavbar currentUser={currentUser} /> : <PublicNavbar />}
    </>
  );
};

export default Navbar;
