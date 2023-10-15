import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
//Get FireBase User
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";

const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    rating: "",
    search: "",
  });
  const [loading, setLoading] = useState(false);

  const filterProductsByCategory = () => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      const filteredByCategory = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filteredByCategory);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (filters.minPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price >= parseFloat(filters.minPrice)
      );
    }

    if (filters.maxPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(filters.maxPrice)
      );
    }

    if (filters.rating !== "") {
      filtered = filtered.filter(
        (product) => product.rating >= parseFloat(filters.rating)
      );
    }

    if (filters.search !== "") {
      filtered = filtered.filter((product) => {
        const titleMatches = product.title
          .toLowerCase()
          .includes(filters.search.toLowerCase());
        const categoryMatches = product.category
          .toLowerCase()
          .includes(filters.search.toLowerCase());

        return titleMatches || categoryMatches;
      });
    }

    setFilteredProducts(filtered);
  };

  const sortProducts = (event) => {
    const sortedProducts = [...filteredProducts];
    const sortBy = event.target.value;
    if (sortBy === "az") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "za") {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "low") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "azRating") {
      sortedProducts.sort((a, b) => a.rating - b.rating);
    } else if (sortBy === "zaRating") {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(sortedProducts);
  };

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/products");
      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      } else {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  const deleteProduct = async (productId) => {
   try {
    const response = await axios.delete(`http://localhost:3000/products/${productId}`)
    if (response.status !== 200) {
      throw new Error("Something went wrong!");
    }
    else{
      const deletedProduct = products.filter((product) => product.id !== productId)
      setProducts(deletedProduct)
      setFilteredProducts(deletedProduct);
    }
   } catch (error) {
    console.log(error.message)
   }
  }

  const getCategories = () => {
    const addCategories = [
      ...new Set(products.map((product) => product.category)),
    ];
    setCategories(addCategories);
  };

  const resetFilters = () => {
    setFilteredProducts(products);
  };


  //USER
  const [user, setUser] = useState([]);
  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const userArray = [];
      result.forEach((user) => {
        userArray.push(user.data());
        setLoading(false);
      });
      setUser(userArray);
      console.log(userArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
    getUserData();
  }, []);

  useEffect(() => {
    getCategories();
  }, [products]);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  useEffect(() => {
    filterProductsByCategory();
  }, [selectedCategory]);

  const contextValue = {
    filteredProducts,
    filters,
    setFilters,
    sortProducts,
    categories,
    selectedCategory,
    setSelectedCategory,
    resetFilters,
    loading,
    setLoading,
    user,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductContextProvider };
