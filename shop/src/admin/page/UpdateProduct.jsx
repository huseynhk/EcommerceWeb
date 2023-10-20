import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { fetchProduct } from "../../api/getRequest";
import { SketchPicker } from "react-color";
//Image
import { storage } from "../../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UpdateProduct = () => {
  const { categories, subcategories } = useContext(ProductContext);
  const [updatedProduct, setUpdatedProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    stock: "",
    rating: "",
    size: "",
    gender: "",
    disCountPrice: "",
    color: "#000",
    brand: "",
  });
  const [editFilterSubCategories, setEditFilterSubCategories] = useState([]);

  const [image, setImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { productId } = useParams();
  const navigate = useNavigate();

  const resultFetchProduct = async () => {
    const result = await fetchProduct(productId);
    if (typeof result == "string") {
      toast.error(result);
    } else {
      setUpdatedProduct(result);
      setImage(result.image);
    }
  };

  const handleColorChange = (newColor) => {
    setUpdatedProduct({ ...updatedProduct, color: newColor.hex });
  };

  useEffect(() => {
    resultFetchProduct();
  }, [productId]);

  useEffect(() => {
    if (updatedProduct.date) {
      setSelectedDate(new Date(updatedProduct.date));
    }
  }, [updatedProduct]);

  const resetForm = () => {
    setUpdatedProduct({
      title: "",
      description: "",
      price: "",
      category: "",
      subcategory: "",
      stock: "",
      rating: "",
    });
    setImage(null);
  };

  const updateProduct = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/products/${productId}`,
        {
          ...updatedProduct,
          image,
          date: selectedDate,
        }
      );

      if (response.status !== 200) {
        throw new Error("Error");
      } else {
        setUpdatedProduct(response.data);
        toast.success("Product added successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        resetForm();
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setUpdatedProduct({
  //     ...updatedProduct,
  //     [name]: value,
  //   });
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if ([name] == "category") {
      const filterSubCatsByCatId = subcategories.filter(
        (sub) => sub.categoryId == value
      );
      setEditFilterSubCategories(filterSubCatsByCatId);
    }
    setUpdatedProduct({
      ...updatedProduct,
      [name]:
        [name] == "category"
          ? categories.find((category) => category.id == value)
          : [name] == "subcategory"
          ? subcategories.find((subcategory) => subcategory.id == value)
          : value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        console.log(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
          console.log(downloadURL);
        });
      }
    );
  };

  return (
    <>
      <Layout>
        <div className="flex justify-center items-center h-screen dark:bg-black">
          <div className=" bg-primary px-8 py-4 rounded-md mb-16 dark:bg-cyan-700">
            <div className="">
              <h1 className="text-center text-blue-200 text-lg mb-4 font-bold dark:text-white">
                Update Product
              </h1>
            </div>
            <div>
              <input
                type="text"
                value={updatedProduct.title}
                onChange={handleInputChange}
                name="title"
                className=" bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                placeholder="Product title"
              />
            </div>
            <div>
              <input
                type="number"
                value={updatedProduct.price}
                onChange={handleInputChange}
                name="price"
                className=" bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                placeholder="Product price"
              />
            </div>
            <div>
              <input
                type="number"
                value={updatedProduct.disCountPrice}
                onChange={handleInputChange}
                name="disCountPrice"
                className=" bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                placeholder="Product disCountPrice"
              />
            </div>
            <div>
              <input
                type="text"
                value={updatedProduct.size}
                onChange={handleInputChange}
                name="size"
                className="bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                placeholder="Product Size"
              />
            </div>
            <div>
              <select onChange={handleInputChange} name="gender">
                <option value="select">Select a Gender</option>
                <option value="man">Man</option>
                <option value="woman">Woman</option>
                <option value="uni">Uni</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                value={updatedProduct.brand}
                onChange={handleInputChange}
                name="brand"
                className="bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                placeholder="Product Brand"
              />
            </div>
            <div>
              <input
                type="file"
                onChange={handleImage}
                name="imageurl"
                className=" bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                placeholder="Product imageUrl"
              />
            </div>
            <div>
              <select onChange={handleInputChange} name="category">
                <option value="select">Select a Category</option>
                {categories.map((category, index) => (
                  <option
                    value={category.id}
                    selected={category.id === updatedProduct.category.id}
                    key={index}
                  >
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                onChange={handleInputChange}
                value={updatedProduct.subcategory.id}
                name="subcategory"
              >
                {/* <option value="select">Select a Sub Category</option> */}
                {editFilterSubCategories.length > 0 &&
                  editFilterSubCategories.map((subcategory, index) => (
                    <option
                      value={subcategory.id}
                      selected={
                        subcategory.id === updatedProduct.subcategory.id
                      }
                      key={index}
                    >
                      {subcategory.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <input
                type="number"
                value={updatedProduct.stock}
                onChange={handleInputChange}
                name="stock"
                className="bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                placeholder="Product stock"
              />
            </div>
            <div>
              <input
                type="number"
                value={updatedProduct.rating}
                onChange={handleInputChange}
                name="rating"
                className="bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                placeholder="Product rating"
              />
            </div>
            <div>
              <div>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                />
              </div>
              <textarea
                cols="30"
                rows="3"
                name="description"
                value={updatedProduct.description}
                onChange={handleInputChange}
                className=" bg-gray-600 mb-2 px-3 py-1 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                placeholder="Product description"
              ></textarea>
            </div>
            <div className=" flex justify-center mb-3">
              <button
                onClick={updateProduct}
                className=" bg-cyan-400 w-full text-primary font-bold  px-3 py-1 rounded-sm  dark:bg-gray-300"
              >
                Update Product
              </button>
            </div>
          </div>
          <div>
            <SketchPicker
              color={updatedProduct.color}
              onChangeComplete={handleColorChange}
              className="ml-6 mb-[200px]"
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UpdateProduct;
