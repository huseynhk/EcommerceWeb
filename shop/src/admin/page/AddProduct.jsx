import React, { useState } from "react";
import axios from "axios";
//Image
import { storage } from "../../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout"

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    rating: "",
  });
  const [image, setImage] = useState(null);

  const resetForm = () => {
    setNewProduct({
      title: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      rating: "",
    });
    setImage(null);
  };

  const addProduct = async (event) => {
    event.preventDefault();
    const { title, description, price, category, stock, rating } = newProduct;
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      price.trim() === "" ||
      category.trim() === "" ||
      stock.trim() === "" ||
      rating.trim() === ""
    ) {
      toast.error("All input required");
    }

    try {
      const response = await axios.post("http://localhost:3000/products", {
        ...newProduct,
        image,
      });
      if (response.status !== 200) {
        throw new Error("Error");
      } else {
        setNewProduct(response.data);
        toast.success("Product added successfully!");
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({
      ...newProduct,
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
              Add Product
            </h1>
          </div>
          <div>
            <input
              type="text"
              value={newProduct.title}
              onChange={handleInputChange}
              name="title"
              className=" bg-gray-600 mb-4 px-3 py-2 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              placeholder="Product title"
            />
          </div>
          <div>
            <input
              type="number"
              value={newProduct.price}
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
              value={newProduct.category}
              onChange={handleInputChange}
              name="category"
              className=" bg-gray-600 mb-4 px-3 py-2 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              placeholder="Product category"
            />
          </div>
          <div>
            <input
              type="number"
              value={newProduct.stock}
              onChange={handleInputChange}
              name="stock"
              className="bg-gray-600 mb-4 px-3 py-2 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              placeholder="Product stock"
            />
          </div>
          <div>
            <input
              type="number"
              value={newProduct.rating}
              onChange={handleInputChange}
              name="rating"
              className="bg-gray-600 mb-4 px-3 py-2 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              placeholder="Product rating"
            />
          </div>
          <div>
            <textarea
              cols="30"
              rows="3"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              className=" bg-gray-600 mb-4 px-3 py-2 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
              placeholder="Product description"
            ></textarea>
          </div>
          <div className=" flex justify-center mb-3">
            <button
              onClick={addProduct}
              className=" bg-cyan-400 w-full text-primary font-bold  px-3 py-2 rounded-sm  dark:bg-gray-300"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
      </Layout>
    </>
  );
};

export default AddProduct;
