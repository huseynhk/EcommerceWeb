import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Product from "./components/Product";
import Sidebar from "./components/Sidebar";
import CartItem from "./components/CartItem";
import AddProduct from "./admin/page/AddProduct";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<CartItem />} />
        <Route path="add" element={<AddProduct />} />

     
      </Routes>
      <Sidebar />
    </>
  );
}

export default App;
