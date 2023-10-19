import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";

const AddSubCategory = () => {
  const { categories } = useContext(ProductContext);
  const [newSubCategory, setNewSubCategory] = useState({
    name: "",
    categoryId: 0,
  });
  const [selectedCatId, setSelectedCatId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addSubCategory = async (event) => {
    event.preventDefault();

    try {
      if (newSubCategory.name  == "" ) {
        throw new Error("All input required");
      } else {
        const createdSubCategory = {
          name: newSubCategory.name,
          categoryId: Number(selectedCatId),
        };
        const response = await axios.post(
          "http://localhost:3000/subCategories",
          createdSubCategory
        );
        if (response.status !== 201) {
          throw new Error("Error");
        } else {
          setNewSubCategory(response.data);
          toast.success("Category added successfully!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setNewSubCategory({
            name: "",
            categoryId: 0,
          });
          navigate("/dashboard");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Layout>
        <div className="flex justify-center items-center h-screen dark:bg-black">
          <div className=" bg-primary px-10 py-10 rounded-md mb-16 dark:bg-cyan-700">
            <div className="">
              <h1 className="text-center text-blue-200 text-lg mb-4 font-bold dark:text-white">
                Add Sub Category
              </h1>
            </div>
            <div>
              <input
                type="text"
                value={newSubCategory.name}
                onChange={(e) =>
                  setNewSubCategory({
                    ...newSubCategory,
                    name: e.target.value,
                  })
                }
                className="bg-gray-600 mb-4 px-3 py-2 w-full lg:w-[20em] rounded-sm text-white placeholder:text-gray-200 outline-none"
                placeholder="Sub Category name"
              />
            </div>
            <div>
              {categories.length > 0 && (
                <select onChange={(e) => setSelectedCatId(e.target.value)}>
                  <option value={0}>Select a Category</option>
                  {categories.map((catergory, index) => (
                    <option value={catergory.id} key={index}>
                      {catergory.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className=" flex justify-center mb-3">
              <button
                onClick={addSubCategory}
                className=" bg-cyan-400 w-full text-primary font-bold  px-3 py-2 rounded-sm  dark:bg-gray-300"
              >
                Add Sub Category
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AddSubCategory;
