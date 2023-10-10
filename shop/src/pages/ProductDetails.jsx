import React, { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/slices/basketSlice";
import Layout from "../components/layout/Layout";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useContext(ProductContext);

  const product = products.find((product) => {
    return product.id === parseInt(id);
  });

  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  const { title, price, description, image, category } = product;

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        id: product.id,
        price: product.price,
        amount: 1,
        image: product.image,
        totalPrice: product.price,
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
      <Layout>
        <section className="pt-32 pb-12 lg:py-32 h-screen">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
                <img
                  className="max-w-[200px] lg:max-w-sm"
                  src={image}
                  alt={title}
                />
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-[27px] font-medium mb-2 max-w-[450px] mx-auto text-gega-melon">
                  {title}
                </h1>
                <h1 className=" text-cyan-700 uppercase">{category}</h1>
                <h1 className="text-gega-red font-medium mb-6 text-3xl">
                  $ {price}
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
