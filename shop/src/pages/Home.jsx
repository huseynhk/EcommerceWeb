import React, { useContext } from "react";
import Layout from "../components/layout/Layout";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";

const Home = () => {
  const { products } = useContext(ProductContext);
  //   const filteredProduct = products.filter((product) => {
  //     return(
  //       product.category === "men's clothing" ||
  //       product.category === "women's clothing"
  //     )
  //   })
  //  console.log(filteredProduct)

  return (
    <Layout>
      <>
        <section className="py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] 
              mx-w-sm mx-auto md:max-w-none md:mx-w-0">
              {products.map((product) => (
                <Product product={product} key={product.id}/>
              ))}
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
};

export default Home;
