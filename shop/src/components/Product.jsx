import React from "react";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { addToCart } from "../features/slices/basketSlice";
import { useDispatch } from "react-redux";

const Product = ({ product }) => {
  const { id, title, category, price, image, rating } = product;
  const dispatch = useDispatch();

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
        discountPercentage: product.discountPercentage,
      })
    );
  };

  return (
    <>
      <div
        key={id}
        className="w-full h-[340px] mb-4 bg-indigo-50 rounded-sm border border-indigo-600 dark:border-gega-melon
        relative overflow-hidden group transition"
      >
        <div className="w-full h-full flex justify-center items-center flex-col  dark:bg-gray-500/75 dark:text-gray-200">
          <div className="w-[405px] md:w-[230px] mx-auto flex justify-center items-center mt-2">
            <img
              src={image}
              alt={title}
              className=" -mt-8 h-[120px] w-[270px] md:w-[150px] object-cover group-hover:scale-110 rounded-md transition duration-500"
            />

            <div className="absolute top-2 -right-4 group-hover:right-1 opacity-0 group-hover:opacity-100 transition duration-500">
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
                Category:{category}
              </div>
              <Link to={`/product/${id}`}>
                <h3 className="font-semibold my-1">{title.slice(0, 20)}</h3>
              </Link>

              <div className="font-semibold text-violet-600 dark:text-cyan-200">
                Rating:{rating}
              </div>
              <div className="font-semibold text-green-600 dark:text-cyan-200">
                ${price}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
