import React from "react";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { addToCart } from "../features/slices/basketSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  const {
    id,
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
  } = product;
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        id: product.id,
        price: Number(product.price),
        amount: 1,
        image: product.image,
        totalDiscountPrice: Number(product.disCountPrice),
        totalPrice: Number(product.price),
        title: product.title,
        description: product.description,
        rating: product.rating,
        brand: product.brand,
        category: product.category,
        disCountPrice: Number(product.disCountPrice),
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
      <div
        key={id}
        className="w-full h-[450px]  mb-4 bg-indigo-50 rounded-md border border-indigo-600 dark:border-cyan-300
        relative overflow-hidden group transition"
      >
        <div className="w-full h-full flex justify-center items-center flex-col text-md  dark:bg-gray-500/75 dark:text-gray-200">
          <div className="w-full flex justify-center items-center ">
            <img
              src={image}
              alt={title}
              className=" -mt-4 h-[200px] w-[350px]  object-cover group-hover:scale-110 rounded-md transition duration-300"
            />

            <div className="absolute top-2 -right-4 group-hover:right-1 opacity-0 group-hover:opacity-100 transition duration-500 ">
              <button onClick={addToCartHandler}>
                <div className="flex justify-center items-center text-red-50 w-8 h-8 bg-blue-500 rounded-sm">
                  <BsPlus className="text-3xl" />
                </div>
              </button>

              <Link
                to={`/product/${id}`}
                className="flex justify-center items-center text-primary w-8 h-8 bg-white drop-shadow-xl rounded-sm"
              >
                <BsEyeFill />
              </Link>
            </div>
          </div>

          <div className="mt-5 me-1 ">
            <div className="ml-0 md:ml-4 text-2xl md:text-lg">
              <div className="text-sm capitalize text-gray-600 dark:text-black font-semibold">
                Category:{category.name}
              </div>
              <div className="text-sm capitalize text-gray-600 dark:text-black font-semibold">
                Sub Category:{subcategory.name}
              </div>
              <Link to={`/product/${id}`}>
                <h3 className="font-semibold my-1">{title}</h3>
              </Link>

              <div className="flex items-center ">
                <span className="mr-2">Color:</span>
                {color && (
                  <div
                    className="h-5 w-5 rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                )}
              </div>
              <div className="font-semibold text-violet-600 dark:text-cyan-200">
                Rating:{rating}
              </div>
              <div className="flex items-center ">
                <div className="font-semibold text-green-600 dark:text-green-200 mr-2">
                  ${price}
                </div>
                <div className="font-semibold text-red-600 dark:text-red-200">
                  ${disCountPrice}
                </div>
              </div>
              <div className="font-semibold text-green-600 dark:text-cyan-200">
               Size: {size}
              </div>
              <div className="font-semibold text-green-600 dark:text-cyan-200">
               Gender: {gender}
              </div>
              <div className="font-semibold text-green-600 dark:text-cyan-200">
               Brand: {brand}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
