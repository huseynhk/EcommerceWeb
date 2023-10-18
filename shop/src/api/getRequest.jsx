import axios from "axios";

export const fetchProduct = async (productId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/products/${productId}`
    );
    if (response.status !== 200) {
      throw new Error("Error fetching product");
    } else {
      return response.data;
    }
  } catch (error) {
    return error.message;
  }
};

export const fetchCategory = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/categories/${categoryId}`
      );
      if (response.status !== 200) {
        throw new Error("Error fetching product");
      } else {
        return response.data;
      }
    } catch (error) {
      return error.message;
    }
  };

  export const fetchSubCategory = async (subCategoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/subCategories/${subCategoryId}`
      );
      if (response.status !== 200) {
        throw new Error("Error fetching product");
      } else {
        return response.data;
      }
    } catch (error) {
      return error.message;
    }
  };
