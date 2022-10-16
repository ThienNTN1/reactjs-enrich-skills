import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddNewCategory from "./components/Categories/AddNewCategory";
import AdminRoute from "./components/Navigation/ProtectedRoutes/AdminRoute";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Users/Login/Login";
import Navbar from "./components/Navigation/Navbar";
import Register from "./components/Users/Register/Register";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/add-category"
          element={
            <AdminRoute component={AddNewCategory}/>
          }
        />
        <Route
          path="/category-list"
          element={
            <AdminRoute component={CategoryList}/>
          }
        />
        <Route
          path="/update-category/:id"
          element={
            <AdminRoute component={UpdateCategory}/>
          }
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
