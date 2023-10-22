import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/slices/basketSlice";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const { t } = useTranslation();

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
    stock,
  } = product;
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
        <title>Home Detail</title>
      </Helmet>
      <Layout>
        <section className="pt-32 pb-12 lg:py-32 h-screen dark:bg-black">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
                <img
                  className="max-w-[250px] lg:max-w-sm h-[600px] object-cover rounded-lg"
                  src={image}
                  alt={title}
                />
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-[27px] font-medium mb-2 max-w-[450px] mx-auto text-gega-melon">
                  {t("title")} {title}
                </h1>
                <h2 className=" text-cyan-700 uppercase font-semibold text-2xl">
                  {t("category")}:{category ? category.name : ""}
                </h2>
                <div className="flex  flex-col justify-center">
                  <h2 className="text-gega-red mr-3 font-medium mb-6 text-3xl">
                    {t("price")}: $ {price}
                  </h2>
                  <h2 className="text-green-500 font-medium mb-6 text-3xl">
                    {t("disCountPrice")}: $ {price - disCountPrice}
                  </h2>
                </div>
                <h2 className=" text-yellow-700 uppercase font-semibold text-2xl mb-2">
                  {t("rating")}:{rating}
                </h2>
                <h2 className=" text-yellow-700 uppercase font-semibold text-2xl mb-2">
                  {t("size")}:{size}
                </h2>
                <h2 className=" text-yellow-700 uppercase font-semibold text-2xl mb-2">
                  {t("subCat")}:{subcategory ? subcategory.name : ""}
                </h2>
                <h2 className=" text-yellow-700 uppercase font-semibold text-2xl mb-2">
                  {t("gender")}:{gender}
                </h2>
                <h2 className=" text-yellow-700 uppercase font-semibold text-2xl mb-2">
                  {t("brand")}:{brand}
                </h2>

                <div className="flex items-center ">
                  <span className="mr-2 text-3xl dark:text-white">
                    {" "}
                    {t("color")}:
                  </span>
                  {color && (
                    <div
                      className="h-10 w-10 rounded-full"
                      style={{ backgroundColor: color }}
                    ></div>
                  )}
                </div>
                <p className="mb-8 text-cyan-500">{description}</p>

                <button
                  className="bg-slate-400 py-4 px-6 rounded-lg hover:bg-slate-300 transition duration-500"
                  onClick={addToCartHandler}
                >
                  {t("add")}
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
