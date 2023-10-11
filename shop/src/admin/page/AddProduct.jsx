import React, { useState } from "react";
import axios from "axios";
import { storage } from "../../firebaseConfig";
import {ref, uploadBytesResumable,getDownloadURL} from "firebase/storage";

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: ""
  });

  const [image,setImage] = useState(null);

  const addProduct = async (e) => {
    e.preventDefault()
    const { title, description, price, category } = newProduct;
    // if (
    //   title.trim() === "" ||
    //   description.trim() === "" ||
    //   price.trim() === "" ||
    //   category.trim() === "" ||
    //   image.trim() === ""
    // ) {
    //   alert("All input required");
    // }

    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        {
            ...newProduct,image
        }
      );
      if (response.status !== 200) {
        throw new Error("Error");
      } else {
        setNewProduct(response.data);
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
      <div>
        <form >
          <input
            type="text"
            name="title"
            value={newProduct.title}
            onChange={handleInputChange}
            className="p-2 bg-blue-200 m-2"
          />
          <input type="file" onChange={handleImage} />
          <button className="p-2 bg-gega-red" onClick={addProduct}>
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
