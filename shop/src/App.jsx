import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Product from "./components/Product";
import Sidebar from "./components/Sidebar";
import CartItem from "./components/CartItem";
import AddProduct from "./admin/page/AddProduct";
import UpdateProduct from "./admin/page/UpdateProduct";
import Dashboard from "./admin/Dashboard/Dashboard";
import Login from "./pages/registration/Login";
import SignUp from "./pages/registration/SignUp";
import NoPage from "./pages/NoPage";
import AddCategory from "./admin/page/AddCategory";
import UpdateCategory from "./admin/page/UpdateCategory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<CartItem />} />
        <Route path="*" element={<NoPage />} />

        <Route
          path="/addproduct"
          element={
            <RouteForAdmin>
              <AddProduct />
            </RouteForAdmin>
          }
        />
        <Route
          path="/addcategory"
          element={
            <RouteForAdmin>
              <AddCategory />
            </RouteForAdmin>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RouteForAdmin>
              <Dashboard />
            </RouteForAdmin>
          }
        />

        <Route
          path="/updateproduct/:productId"
          element={
            <RouteForAdmin>
              <UpdateProduct />
            </RouteForAdmin>
          }
        />
        <Route
          path="/updatecategory/:productId"
          element={
            <RouteForAdmin>
              <UpdateCategory />
            </RouteForAdmin>
          }
        />

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
      <Sidebar />
      <ToastContainer />
    </>
  );
}

export default App;

export const RouteForUser = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export const RouteForAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.email === "khuseyn693@gmail.com") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
