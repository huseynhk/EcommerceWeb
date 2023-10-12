import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Product from "./components/Product";
import Sidebar from "./components/Sidebar";
import CartItem from "./components/CartItem";
import AddProduct from "./admin/page/AddProduct";
import Login from "./pages/registration/Login";
import SignUp from "./pages/registration/SignUp";

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
        <Route path="add" element={<AddProduct />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />


      </Routes>
      <Sidebar />
      <ToastContainer />
    </>
  );
}

export default App;
