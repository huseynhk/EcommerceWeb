import React from "react";
import { Link } from "react-router-dom";
import { IoMdClose, IoMdRemove, IoMdAdd } from "react-icons/io";
import { removeFromCart, increament, decrement } from "../features/slices/basketSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ product }) => {
  const { id, title, price, image, amount } = product;
  const dispatch = useDispatch();

  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-300 w-full ">
      <div className="w-full flex items-center gap-x-4">
        <Link to={`/product/${id}`}>
          <img src={image} alt={title} className="w-[100px] mt-6 h-[100px] rounded-full object-cover" />
        </Link>
      </div>

      <div className="w-full flex flex-col">
        <div className="flex justify-center mb-2 ">
          <div
            className="text-sm uppercase font-medium
           text-primary max-w-[700px] md:max-w-[500px] mt-12 hover:underline dark:text-white"
          >
            <Link to={`/product/${id}`}>{title}</Link>
          </div>

          <div className="cursor-pointer" onClick={() => dispatch(removeFromCart(product))} >
            <IoMdClose className="text-gega-red hover:text-red-500 text-2xl transition duration-300 mt-12" />
          </div>
        </div>

        <div className="flex gap-x-2 h-[36px] p-2 text-sm rounded-sm ">
          <div className="flex flex-1 max-w-[100px] items-center h-full border px-4 py-2 rounded-sm mr-2 text3xl cursor-pointer">
            <div
              className="flex-1 flex justify-center items-center text-red-700 "
              onClick={() => dispatch(decrement(product))}
            >
              <IoMdRemove />
            </div>
            <p className="h-full flex justify-center items-center p-4">
              {amount}
            </p>
            <div className="flex-1 flex justify-center items-center text-green-700"
              onClick={() => dispatch(increament(product))}
              >
              <IoMdAdd />
            </div>
          </div>
         
          <div className="flex-1 flex item-center justify-around text-gray-700 dark:text-gray-100">
            ${price}
          </div>
          <div className="flex-1 flex item-center justify-end font-medium text-primary ml-1 dark:text-gray-100">
            ${`${parseFloat(price * amount).toFixed(2)}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
