import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash } from "react-icons/fi";
import { SidebarContext } from "../contexts/SidebarContext";
import { useSelector, useDispatch } from "react-redux";
import { clearBasket } from "../features/slices/basketSlice";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const cart = useSelector((state) => state.persistedReducer.basket.basket);
  const totalPrice = useSelector(
    (state) => state.persistedReducer.basket.totalPrice
  );
  const totalDiscountPrice = useSelector(
    (state) => state.persistedReducer.basket.totalDiscountPrice
  );
  const totalAmount = useSelector(
    (state) => state.persistedReducer.basket.totalAmount
  );

  const dispatch = useDispatch();
  return (
    <>
      <div
        className={`${
          isOpen ? "right-0" : "-right-full"
        } w-full bg-white dark:bg-black dark:text-white fixed top-0 h-full shadow-2xl md:w-[30vw] 
         xl:max-w-[30vw] mt-14 transition-all duration-500 px-4 lg:px-[35px] `}
      >
        <div
          className="flex justify-between items-center py-6 border-b border-red-400"
          onClick={handleClose}
        >
          <p className="uppercase text-md font-semibold">
            Bag(<span className="text-red-500">{totalAmount}</span>)
          </p>
          <div className="cursor-pointer w-8 h-8 flex justify-center items-center">
            <IoMdArrowForward className="text-3xl text-red-500" />
          </div>
        </div>

        <div className="flex flex-col gap-y-2 h-[550px] lg:h-[600px] border-b overflow-y-auto overflow-x-hidden ">
          {cart.map((product) => (
            <CartItem product={product} key={product.id} />
          ))}

          <div className="w-full flex justify-between items-center mt-10 uppercase font-semibold">
            <h2 className="my-2 text-red-800 ">
              <span className="ml-1 text-indigo-800 ">TotalPrice:</span> $
              {Number(totalPrice).toFixed(2)}
            </h2>
            <h2 className="my-2 text-red-800 ">
              <span className="ml-1 text-indigo-800 ">Discount:</span> $
              {Number(totalDiscountPrice)}

            </h2>
            <div
              className="cursor-pionter py-4 bg-red-500 rounded-md w-10 h-10 flex
              justify-center items-center text-2xl text-white cursor-pointer mr-2"
              onClick={() => dispatch(clearBasket())}
            >
              <FiTrash />
            </div>
          </div>

          <div className="mr-2">
            <Link
              to={"/view"}
              className="bg-gray-300 p-2 flex justify-center items-center rounded-sm my-1 text-primary dark:bg-gray-400 w-full font-medium"
            >
              View Cart
            </Link>

            <Link
              to={"/check"}
              className="bg-primary p-2 flex justify-center items-center rounded-sm text-gray-200 dark:bg-gray-600 w-full font-medium"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
