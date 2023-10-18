import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSubCategory } from "../../api/getRequest";

const UpdateSubCategory = () => {
  const { categories } = useContext(ProductContext);
  const [editSubCategory, setEditSubCategory] = useState({
    name: "",
    categoryId: 0,
    id: 0,
  });
  const [selectedCatId, setSelectedCatId] = useState(0);
  const navigate = useNavigate();
  const { subcategoryId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const resultFetchProduct = async () => {
    const result = await fetchSubCategory(subcategoryId);
    if (typeof result == "string") {
      toast.error(result);
    } else {
      console.log(result);
      setEditSubCategory(result);
    }
  };

  useEffect(() => {
    resultFetchProduct();
  }, [subcategoryId]);

  const updateSubCategory = async (event) => {
    event.preventDefault();
    try {
      if (editSubCategory.name === "" || editSubCategory.categoryId === 0) {
        throw new Error("All input required");
      } else {
        const updatedSubCategory = {
          name: editSubCategory.name,
          categoryId: Number(selectedCatId),
          id: Number(subcategoryId),
        };
        const response = await axios.put(
          `http://localhost:3000/subCategories/${subcategoryId}`,
          updatedSubCategory
        );
        if (response.status !== 200) {
          throw new Error("Error");
        } else {
          setEditSubCategory({
            name: "",
            categoryId: 0,
            id: 0
          });
          toast.success("Category updated successfully!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
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
                Update Sub Category
              </h1>
            </div>
            <div>
              <input
                type="text"
                value={editSubCategory.name}
                onChange={(e) =>
                  setEditSubCategory({
                    ...editSubCategory,
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
                    <option
                      value={catergory.id}
                      key={index}
                      selected={
                        catergory.id == editSubCategory.categoryId
                          ? true
                          : false
                      }
                    >
                      {catergory.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className=" flex justify-center mb-3">
              <button
                onClick={updateSubCategory}
                className=" bg-cyan-400 w-full text-primary font-bold  px-3 py-2 rounded-sm  dark:bg-gray-300"
              >
                Update Sub Category
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UpdateSubCategory;
