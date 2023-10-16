import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [newCategory, setNewCategory] = useState("");

  const navigate = useNavigate();

  const addCategory = async (event) => {
    event.preventDefault();
    if (newCategory == "") {
      toast.error("All input required");
    }
    try {
      const response = await axios.post("http://localhost:3000/categories", {
        name: newCategory,
      });
      if (response.status !== 201) {
        throw new Error("Error");
      } else {
        setNewCategory(response.data.name);
        toast.success("Category added successfully!");
        setNewCategory("");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div className="flex justify-center items-center h-screen dark:bg-black">
          <div className=" bg-primary px-10 py-10 rounded-md mb-16 dark:bg-cyan-700">
            <div className="">
              <h1 className="text-center text-blue-200 text-lg mb-4 font-bold dark:text-white">
                Add Category
              </h1>
            </div>
            <div>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                name="name"
                className="bg-gray-600 mb-4 px-3 py-2 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                placeholder="Category name"
              />
            </div>

            <div className=" flex justify-center mb-3">
              <button
                onClick={addCategory}
                className=" bg-cyan-400 w-full text-primary font-bold  px-3 py-2 rounded-sm  dark:bg-gray-300"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AddCategory;
