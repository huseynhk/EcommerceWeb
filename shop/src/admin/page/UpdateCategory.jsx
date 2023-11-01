import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategory } from "../../api/getRequest";

const UpdateCategory = () => {
  const [editCategory, setEditCategory] = useState("");

  const navigate = useNavigate();
  const { categoryId } = useParams();

  const resultFetchProduct = async () => {
    const result = await fetchCategory(categoryId);
    if (typeof result == "string") {
      toast.error(result,{
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    } else {
      console.log(result);
      setEditCategory(result.name);
    }
  };

  useEffect(() => {
    resultFetchProduct();
  }, [categoryId]);

  const updateCategory = async (event) => {
    event.preventDefault();
    if (editCategory == "") {
      toast.error("All input required");
    }
    try {
      const response = await axios.put(
        `http://localhost:3000/categories/${productId}`,
        { name: editCategory }
      );

      if (response.status !== 200) {
        throw new Error("Error");
      } else {
        setEditCategory(response.data.name);
        toast.success("Category added successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setEditCategory("");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Layout>
        <div className="flex justify-center items-center h-screen dark:bg-black">
          <div className=" bg-primary px-10 py-10 rounded-md mb-16 dark:bg-cyan-700">
            <div className="">
              <h1 className="text-center text-blue-200 text-lg mb-4 font-bold dark:text-white">
                Update Category
              </h1>
            </div>
            <div>
              <input
                type="text"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                name="name"
                className="bg-gray-600 mb-4 px-3 py-2 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                placeholder="Category name"
              />
            </div>

            <div className=" flex justify-center mb-3">
              <button
                onClick={updateCategory}
                className=" bg-cyan-400 w-full text-primary font-bold  px-3 py-2 rounded-sm  dark:bg-gray-300"
              >
                Update Category
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UpdateCategory;
