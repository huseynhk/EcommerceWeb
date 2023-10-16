import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
//Image
import { storage } from "../../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UpdateProduct = () => {

  const [updatedProduct, setUpdatedProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    rating: "",
  });
  const [image, setImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { productId } = useParams();
  const navigate = useNavigate()

  
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products/${productId}`);
      if (response.status !== 200) {
        throw new Error("Error fetching product");
      } else {
        setUpdatedProduct(response.data);
        setImage(response.data.image)
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchProduct();
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
        navigate('/dashboard')

      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
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
          <div className=" bg-primary px-10 py-10 rounded-md mb-16 dark:bg-cyan-700">
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
                className=" bg-gray-600 mb-4 px-3 py-2 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                placeholder="Product title"
              />
            </div>
            <div>
              <input
                type="number"
                value={updatedProduct.price}
                onChange={handleInputChange}
                name="price"
                className=" bg-gray-600 mb-4 px-3 py-2 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                placeholder="Product price"
              />
            </div>
            <div>
              <input
                type="file"
                onChange={handleImage}
                name="imageurl"
                className=" bg-gray-600 mb-4 px-3 py-2 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                placeholder="Product imageUrl"
              />
            </div>
            <div>
              <input
                type="text"
                value={updatedProduct.category}
                onChange={handleInputChange}
                name="category"
                className=" bg-gray-600 mb-4 px-3 py-2 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                placeholder="Product category"
              />
            </div>
            <div>
              <input
                type="number"
                value={updatedProduct.stock}
                onChange={handleInputChange}
                name="stock"
                className="bg-gray-600 mb-4 px-3 py-2 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                placeholder="Product stock"
              />
            </div>
            <div>
              <input
                type="number"
                value={updatedProduct.rating}
                onChange={handleInputChange}
                name="rating"
                className="bg-gray-600 mb-4 px-3 py-2 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                placeholder="Product rating"
              />
            </div>
            <div>
            <div>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="bg-gray-600 mb-4 px-3 py-2 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              />
            </div>
              <textarea
                cols="30"
                rows="3"
                name="description"
                value={updatedProduct.description}
                onChange={handleInputChange}
                className=" bg-gray-600 mb-4 px-3 py-2 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                placeholder="Product description"
              ></textarea>
            </div>
            <div className=" flex justify-center mb-3">
              <button
                onClick={updateProduct}
                className=" bg-cyan-400 w-full text-primary font-bold  px-3 py-2 rounded-sm  dark:bg-gray-300"
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UpdateProduct;
