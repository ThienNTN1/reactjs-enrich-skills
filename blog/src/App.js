import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* admin route */}
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
          path="/create-post"
          element={<PrivateProtectRoute component={CreatePost} />}
        />
        <Route
          path="/update-post/:id"
          element={<PrivateProtectRoute component={UpdatePost} />}
        />

        {/* public route */}
        <Route path="posts" element={<PostsList />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/:id" element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
