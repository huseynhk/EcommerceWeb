import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      if (response.status !== 200) {
        console.log(error);
      } else {
        setProducts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // console.log(products);

  const contextValue = {
    products,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductContextProvider };
