import React from "react";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { addToCart } from "../features/slices/basketSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

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
    stock,
  } = product;
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
        stock: Number(product.stock),
      })
    );
  };

  return (
    <>
      <Helmet>
        <title>Product Page</title>
      </Helmet>
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
              className=" -mt-[50px] h-[230px] w-[450px]  object-cover group-hover:scale-110 rounded-md transition duration-300"
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

          <div className="flex items-center mt-12">
            <div className="text-xl mr-12 flex items-center justify-center flex-col">
              <div className=" capitalize text-gray-600 dark:text-black font-semibold">
                {t("category")}: {category.name}
              </div>
              <div className="capitalize text-gray-600 dark:text-black font-semibold">
                {t("subCat")}: {subcategory.name}
              </div>
              <div>
                <Link to={`/product/${id}`}>
                  <h3 className="font-semibold my-1">
                    {" "}
                    {t("title")}: {title}
                  </h3>
                </Link>
              </div>

              <div className="flex items-center ">
                <span className="mr-2"> {t("color")}:</span>
                {color && (
                  <div
                    className="h-5 w-5 rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                )}
              </div>

              <div className="flex items-center ">
                <div className="font-semibold text-green-600 dark:text-green-200 mr-2">
                  $ {price}
                </div>
                <div className="font-semibold text-red-600 dark:text-red-200">
                  $ {disCountPrice > 0 ? disCountPrice : "Zero"}
                </div>
              </div>
            </div>

            <div className="text-xl flex items-center justify-center flex-col">
              <div className="font-semibold text-violet-600 dark:text-cyan-200">
                {t("rating")}:{rating}
              </div>
              <div className="font-semibold text-green-600 dark:text-cyan-200 mt-3">
                {t("size")}: {size}
              </div>
              <div className="font-semibold text-green-600 dark:text-cyan-200 my-3">
                {t("gender")}: {gender}
              </div>
              <div className="font-semibold text-green-600 dark:text-cyan-200">
                {t("brand")}: {brand}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
