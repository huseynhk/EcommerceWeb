import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/slices/basketSlice";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products/${id}`);
      if (response.status !== 200) {
        throw new Error("Error fetching product");
      } else {
        setProduct(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const {
    title,
    category,
    price,
    image,
    rating,
    subcategory,
    color,
    size,
    gender,
    disCountPrice,
    brand,
    description,
  } = product;
  const addToCartHandler = () => {
    dispatch(
      addToCart({
        id: product.id,
        price: Number(product.price),
        amount: 1,
        image: product.image,
        totalPrice: Number(product.price),
        title: product.title,
        description: product.description,
        rating: product.rating,
        brand: product.brand,
        category: product.category,
        disCountPrice: product.disCountPrice,
        subcategory: product.subcategory,
        color: product.color,
      })
    );
    toast.success("Product added to cart successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  };

  return (
    <>
      <Layout>
        <section className="pt-32 pb-12 lg:py-32 h-screen dark:bg-black">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
                <img
                  className="max-w-[200px] lg:max-w-sm h-[550px] object-cover rounded-md"
                  src={image}
                  alt={title}
                />
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-[27px] font-medium mb-2 max-w-[450px] mx-auto text-gega-melon">
                  {title}
                </h1>
                <h1 className=" text-cyan-700 uppercase font-semibold text-2xl">
                  Category:{category ? category.name : ""}
                </h1>
                <div className="flex  flex-col justify-center">
                  <h1 className="text-gega-red mr-3 font-medium mb-6 text-3xl">
                   Price: $ {price}
                  </h1>
                  <h1 className="text-green-500 font-medium mb-6 text-3xl">
                  DisCountPrice:  $ {price - disCountPrice}
                  </h1>
                </div>
                <h1 className=" text-yellow-700 uppercase font-semibold text-2xl mb-2">
                  Rating:{rating}
                </h1>
                <h1 className=" text-yellow-700 uppercase font-semibold text-2xl mb-2">
                  Size:{size}
                </h1>
                <h1 className=" text-yellow-700 uppercase font-semibold text-2xl mb-2">
                  SubCategory:{subcategory ? subcategory.name : ""}
                </h1>
                <h1 className=" text-yellow-700 uppercase font-semibold text-2xl mb-2">
                  Gender:{gender}
                </h1>
                <h1 className=" text-yellow-700 uppercase font-semibold text-2xl mb-2">
                  Brand:{brand}
                </h1>
                <h1 className=" text-yellow-700 uppercase font-semibold text-2xl mb-2">
                  Rating:{rating}
                </h1>

                <p className="mb-8 text-cyan-500">{description}</p>

                <button
                  className="bg-slate-400 py-4 px-6 rounded-lg hover:bg-slate-300 transition duration-500"
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ProductDetails;
