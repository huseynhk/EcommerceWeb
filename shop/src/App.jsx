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
import ViewCart from "./pages/ViewCart";
import Checkout from "./pages/Checkout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddSubCategory from "./admin/page/AddSubCategory";
import UpdateSubCategory from "./admin/page/UpdateSubCategory";

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
          path="/addsubcategory"
          element={
            <RouteForAdmin>
              <AddSubCategory />
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
          path="/updatecategory/:categoryId"
          element={
            <RouteForAdmin>
              <UpdateCategory />
            </RouteForAdmin>
          }
        />
        <Route
          path="/updatesubcategory/:subcategoryId"
          element={
            <RouteForAdmin>
              <UpdateSubCategory />
            </RouteForAdmin>
          }
        />
        <Route
          path="/view"
          element={
            <RouteForUser>
              <ViewCart />
            </RouteForUser>
          }
        />
        <Route
          path="/check"
          element={
            <RouteForUser>
              <Checkout />
            </RouteForUser>
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
