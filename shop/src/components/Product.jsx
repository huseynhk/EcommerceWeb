import React from "react";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";

const Product = ({ product }) => {
  const { id, title, category, price, image } = product;
  return (
    <>
      <div
        key={id}
        className="w-full h-[320px] mb-4 bg-indigo-50 rounded-md border border-indigo-600 
        relative overflow-hidden group transition"
      >
        <div className="w-full h-full flex justify-center items-center md:flex-col">
          <div className="w-[200px] mx-auto flex justify-center items-center mt-3">
            <img
              src={image}
              alt={title}
              className="max-h-[125px] max-w-[125px] group-hover:scale-110 rounded-lg transition duration-500"
            />

            <div className="absolute top-2 -right-4 group-hover:right-2 bg-indigo-300 p-2 rounded-sm opacity-0 group-hover:opacity-100 transition duration-300">
              <button>
                <div className="flex justify-center items-center text-red-50 w-8 h-8 bg-red-500 rounded-sm">
                  <BsPlus className="text-3xl" />
                </div>
              </button>

              <Link
                to={`/product/${id}`}
                className="flex justify-center items-center text-primary w-8 h-8 bg-indigo-100 drop-shadow-xl rounded-sm"
              >
                <BsEyeFill />
              </Link>
            </div>
          </div>

          <div className="mt-6 me-1">
            <div className="text-sm capitalize text-gray-600">{category}</div>
            <Link to={`/product/${id}`}>
              <h3 className="font-semibold my-1">{title.slice(0,20)}</h3>
            </Link>
            <div className="font-semibold  text-green-600">${price}</div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Product;
