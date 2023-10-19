import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
//Get FireBase User
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";

const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubtCategory, setSubSelectedCategory] = useState("all");

  const [genders, setGenders] = useState([]);
  const [selectedtGender, setSelectedGender] = useState("all");

  const [sizes, setSizes] = useState([]);
  const [selectedtSize, setSelectedSize] = useState("all");

  const [brands, setBrands] = useState([]);
  const [selectedtBrand, setSelectedBrand] = useState("all");

  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("all");

  const [subcategories, setSubCategories] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    rating: "",
    search: "",
  });
  const [loading, setLoading] = useState(false);

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

  const getAllCategories = async () => {
    try {
      const request = await axios.get("http://localhost:3000/categories");
      if (request.status !== 200) {
        throw new Error("Something went wrong");
      } else {
        setCategories(request.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllSubCategories = async () => {
    try {
      const request = await axios.get("http://localhost:3000/subcategories");
      if (request.status !== 200) {
        throw new Error("Something went wrong");
      } else {
        setSubCategories(request.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/products/${productId}`
      );
      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      } else {
        const deletedProduct = products.filter(
          (product) => product.id !== productId
        );
        toast.success("Product is deleted");
        setProducts(deletedProduct);
        setFilteredProducts(deletedProduct);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/categories/${categoryId}`
      );
      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      } else {
        const deletedCategory = categories.filter(
          (category) => category.id !== categoryId
        );
        toast.success("Category is deleted", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setCategories(deletedCategory);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteSubCategory = async (subCategoryId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/subCategories/${subCategoryId}`
      );
      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      } else {
        const deletedSubCategory = subcategories.filter(
          (subcategory) => subcategory.id !== subCategoryId
        );
        toast.success("Sub Category is deleted", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setSubCategories(deletedSubCategory);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const filterProductsByCategory = () => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      let filteredByCategory = products.filter(
        (product) => product.category.id == selectedCategory
      );
      console.log("filteredByCategory", filteredByCategory);
      setFilteredProducts(filteredByCategory);
    }
  };

  const filterProductsBySubCategory = () => {
    if (selectedSubtCategory === "all") {
      setFilteredProducts(products);
    } else {
      let filteredBySubCategory = products.filter(
        (product) => product.subcategory.id == selectedSubtCategory
      );
      setFilteredProducts(filteredBySubCategory);
    }
  };



//Gender

  const filterProductsByGender = () => {
    if (selectedtGender === "all") {
      setFilteredProducts(products);
    } else {
      let filteredByGender = products.filter(
        (product) => product.gender === selectedtGender
      );
      setFilteredProducts(filteredByGender);
    }
  };
  const getAllGenders = () => {
    const allGenders = [...new Set(products.map((product) => product.gender))];
    setGenders(allGenders);
  };
  useEffect(() => {
    filterProductsByGender();
  }, [selectedtGender, products]);

  //Size
  const filterProductsBySize = () => {
    if (selectedtSize === "all") {
      setFilteredProducts(products);
    } else {
      let filteredBySize = products.filter(
        (product) => product.size === selectedtSize
      );
      setFilteredProducts(filteredBySize);
    }
  };
  const getAllSizes = () => {
    const allSizes = [...new Set(products.map((product) => product.size))];
    setSizes(allSizes);
  };
  useEffect(() => {
    filterProductsBySize();
  }, [selectedtSize, products]);

  // Brand
  const filterProductsByBrand = () => {
    if (selectedtBrand === "all") {
      setFilteredProducts(products);
    } else {
      let filteredByBrand = products.filter(
        (product) => product.brand === selectedtBrand
      );
      setFilteredProducts(filteredByBrand);
    }
  };

  const getAllBrands = () => {
    const allBrands = [...new Set(products.map((product) => product.brand))];
    setBrands(allBrands);
  };
  useEffect(() => {
    filterProductsByBrand();
  }, [selectedtBrand, products]);

  ///////////////////////////////////////////////////////
  //Color
  const filterProductsByColor = () => {
    if (selectedColor === "all") {
      setFilteredProducts(products);
    } else {
      let filteredByColor = products.filter(
        (product) => product.color === selectedColor
      );
      setFilteredProducts(filteredByColor);
    }
  };

  const getAllColors = () => {
    const allColors = [...new Set(products.map((product) => product.color))];
    setColors(allColors);
  };
  useEffect(() => {
    filterProductsByColor();
  }, [selectedColor, products]);
  ///////////////////////////////////////////////////////

  useEffect(() => {
    getAllColors();
    getAllBrands();
    getAllSizes();
    getAllGenders();
  }, [products]);
  // /////////////////////////////////////////////////////
  //USER Firebase
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
  const resetFilters = () => {
    setFilteredProducts(products);
  };
  // /////////////////////////////////////////////////////

  useEffect(() => {
    getAllProducts();
    getUserData();
    getAllCategories();
    getAllSubCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);



  useEffect(() => {
    filterProductsByCategory();
  }, [selectedCategory, products]);

  useEffect(() => {
    filterProductsBySubCategory();
  }, [selectedSubtCategory, products]);

  const contextValue = {
    filteredProducts,
    filters,
    setFilters,
    sortProducts,
    categories,
    subcategories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    selectedSubtCategory,
    setSubSelectedCategory,
    resetFilters,
    loading,
    setLoading,
    user,
    deleteProduct,
    deleteCategory,
    deleteSubCategory,
    getAllProducts,
    getAllCategories,
    getAllSubCategories,
    genders,
    selectedtGender,
    setSelectedGender,
    sizes,
    selectedtSize,
    setSelectedSize,
    brands,
    selectedtBrand,
    setSelectedBrand,
    colors,
    selectedColor,
    setSelectedColor,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductContextProvider };
