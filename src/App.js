import { HashRouter, Routes, Route } from "react-router-dom";

import AddNewCategory from "./components/Categories/AddNewCategory";
import AdminRoute from "./components/Navigation/ProtectedRoutes/AdminRoute";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Users/Login/Login";
import Navbar from "./components/Navigation/Navbar";
import Register from "./components/Users/Register/Register";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import PostsList from "./components/Posts/PostsList";
import PrivateProtectRoute from "./components/Navigation/ProtectedRoutes/PrivateProtectRoute";
import CreatePost from "./components/Posts/CreatePost";
import UpdatePost from "./components/Posts/UpdatePost";
import PostDetails from "./components/Posts/PostDetails";
import Profile from "./components/Users/Profile/Profile";
import UsersList from "./components/Users/UsersList/UsersList";
import UpdatePassword from "./components/Users/PasswordManagement/UpdatePassword";
import UpdateProfileForm from "./components/Users/Profile/UpdateProfileForm";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        {/* admin route */}
        <Route
          path="/users"
          element={<AdminRoute component={UsersList} />}
        />
        <Route
          path="/add-category"
          element={<AdminRoute component={AddNewCategory} />}
        />
        <Route
          path="/category-list"
          element={<AdminRoute component={CategoryList} />}
        />
        <Route
          path="/update-category/:id"
          element={<AdminRoute component={UpdateCategory} />}
        />

        {/* private route */}
        <Route
          path="/profile/:id"
          element={<PrivateProtectRoute component={Profile} />}
        />
        <Route
          path="/update-password"
          element={<PrivateProtectRoute component={UpdatePassword} />}
        />
        <Route
          path="/create-post"
          element={<PrivateProtectRoute component={CreatePost} />}
        />
        <Route
          path="/update-post/:id"
          element={<PrivateProtectRoute component={UpdatePost} />}
        />
         <Route
          path="/update-profile/:id"
          element={<PrivateProtectRoute component={UpdateProfileForm} />}
        />
        
        {/* public route */}
        <Route path="posts" element={<PostsList />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/:id" element={<PostDetails />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
