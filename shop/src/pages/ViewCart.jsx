import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import { IoMdRemove, IoMdAdd } from "react-icons/io";
import { FiTrash } from "react-icons/fi";
import { FcFullTrash } from "react-icons/fc";
import { Helmet } from "react-helmet-async";
import {
  removeFromCart,
  increament,
  decrement,
} from "../features/slices/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ViewCart = () => {
  const cart = useSelector((state) => state.persistedReducer.basket.basket);
  const totalPrice = useSelector(
    (state) => state.persistedReducer.basket.totalPrice
  );
  const totalAmount = useSelector(
    (state) => state.persistedReducer.basket.totalAmount
  );
  const totalDiscountPrice = useSelector(
    (state) => state.persistedReducer.basket.totalDiscountPrice
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <Layout>
      <>
        <Helmet>
          <title>View Page</title>
        </Helmet>
        <div className="dark:bg-black">
          <div className="flex gap-x-4 py-2 lg:px-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] mt-[160px] md:mt-[60px] container">
              {cart.map((product, index) => {
                const {
                  id,
                  title,
                  price,
                  image,
                  amount,
                  category,
                  disCountPrice,
                } = product;
                return (
                  <div
                    key={index}
                    className="w-full h-[370px] mb-4 bg-indigo-50 rounded-md border border-indigo-600 dark:border-cyan-300
                   relative overflow-hidden group transition"
                  >
                    <div className="w-full h-full flex justify-center items-center flex-col  dark:bg-gray-500/75 dark:text-gray-200">
                      <div className="w-[405px] md:w-[230px] mx-auto flex justify-center items-center mt-2">
                        <img
                          src={image}
                          alt={title}
                          className=" -mt-12 h-[125px] w-[300px] md:w-[160px] object-cover group-hover:scale-110 rounded-md transition duration-500"
                        />
                      </div>

                      <div className="mt-8  ">
                        <div className="flex flex-col justify-center items-center ">
                          <div>
                            <div className="text-sm capitalize text-gray-600 dark:text-black font-semibold">
                              {t("category")}:{category ? category.name : ""}
                            </div>
                            <Link to={`/product/${id}`}>
                              <h3 className="font-semibold my-1">{title}</h3>
                            </Link>

                            <div className="font-semibold text-violet-600 dark:text-cyan-200">
                              {t("disCountPrice")}: {disCountPrice}
                            </div>
                          </div>

                          <div className="flex gap-x-2 h-[36px] p-2 text-sm rounded-sm mt-4 md:mt-6 md:flex-col md:justify-center md:items-center">
                            <div className="flex flex-1 max-w-[100px] items-center h-full border px-4 py-2 rounded-sm mr-2 text3xl cursor-pointer mt-[1px] md:mt-7">
                              <div
                                className="flex-1 flex justify-center items-center text-red-700 "
                                onClick={() => dispatch(decrement(product))}
                              >
                                <IoMdRemove />
                              </div>

                              <p className="h-full flex justify-center items-center p-4">
                                {amount}
                              </p>
                              <div
                                className="flex-1 flex justify-center items-center text-green-700"
                                onClick={() => dispatch(increament(product))}
                              >
                                <IoMdAdd />
                              </div>
                            </div>

                            <div className="flex md:my-4">
                              <div className="flex-1 flex item-center justify-around text-gray-700 dark:text-gray-100">
                                ${price}
                              </div>

                              <div className="flex-1 flex item-center justify-end font-medium text-primary ml-2 dark:text-gray-100">
                                ${`${parseFloat(price * amount).toFixed(2)}`}
                              </div>
                            </div>

                            <div
                              className="cursor-pointer"
                              onClick={() => dispatch(removeFromCart(product))}
                            >
                              <FcFullTrash className="text-3xl" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gray-500 dark:bg:gray-700 w-[800px] py-4  rounded-sm  flex justfy-center items-center mx-auto mt-5 ">
            <h2 className="m-2 text-gega-melon ">
              <span className=" text-blue-50 text-lg">{t("totalPr")}: </span> $
              {parseFloat(totalPrice).toFixed(2)}
            </h2>
            <h2 className="m-2 text-gega-melon ">
              <span className=" text-blue-50 text-lg">{t("disCountAmount")}: </span> $
              {parseFloat(totalDiscountPrice).toFixed(2)}
            </h2>
            <h2 className="m-2 text-gega-melon ">
              <span className=" text-blue-50 text-lg">{t("result")}: </span> $
              {parseFloat(totalPrice - totalDiscountPrice).toFixed(2)}
            </h2>
            <h2 className="m-2 text-gega-melon ">
              <span className=" text-blue-50 font-semibold ">
              {t("totalAmount")} : 
              </span>
              {totalAmount}
            </h2>
            <div className="flex w-[200px]">
              <div
                className="cursor-pionter py-4  bg-gega-red rounded-md w-16 h-10 flex
              justify-center items-center text-2xl text-white cursor-pointer mx-8"
                onClick={() => dispatch(clearBasket())}
              >
                <FiTrash />
              </div>
              <div
                className="cursor-pionter p-4 bg-blue-500 rounded-md w-[100px] h-10 flex
              justify-center items-center text-lg text-white cursor-pointer"
              >
                <Link to={"/check"}> {t("pay")}</Link>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default ViewCart;
