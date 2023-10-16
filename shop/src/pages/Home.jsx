import React, { useContext } from "react";
import Layout from "../components/layout/Layout";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";
import Hero from "../components/Hero";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const {
    filters,
    setFilters,
    filteredProducts,
    sortProducts,
    categories,
    selectedCategory,
    setSelectedCategory,
    resetFilters,
  } = useContext(ProductContext);
  console.log("selectedCategory", selectedCategory);

  return (
    <Layout>
      <>
        <Helmet>
          <title>Home Page</title>
        </Helmet>
        <Hero />
        <section className="py-4 dark:bg-black dark:text-gray-100">
          <div className="container flex flex-col  items-center justify-around">
            <div
              className="rounded-sm bg-slate-200 dark:bg-slate-800
              flex-row  w-[400px] h-[200px]  
               mt-10  md:w-[800px] md:h-[150px] md:-mb-6"
            >
              <div className="my-2 md:flex ">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                  className="bg-gray-50 border md:mx-1 my-2 md:my-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Product"
                />
                <input
                  type="number"
                  value={filters.rating}
                  onChange={(e) =>
                    setFilters({ ...filters, rating: e.target.value })
                  }
                  className="bg-gray-50 border md:mx-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Rating"
                />
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value })
                  }
                  className="bg-gray-50 border my-2 md:my-0 md:mx-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Min Price"
                />
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value })
                  }
                  className="bg-gray-50 border md:mx-1  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Max Price"
                />
              </div>
              <div className="md:flex">
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 md:mx-1 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={sortProducts}
                >
                  <option value="title">Sort Products</option>

                  <option value="az">AZ Name</option>
                  <option value="za">ZA Name</option>

                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>

                  <option value="azRating">AZ Rating</option>
                  <option value="zaRating">ZA Rating</option>
                </select>

                <select
                  className="my-2 md:my-0 md:mx-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                     dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     value={selectedCategory}
                     onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="bg-slate-700 dark:bg-slate-300 p-2 flex justify-center items-center rounded-sm my-1 dark:text-primary text-gray-200 w-full font-medium"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] mt-[160px] md:mt-[60px] 
              mx-w-sm  md:max-w-none md:mx-w-0 md:container md:ml-20"
            >
              {filteredProducts.map((product) => {
                return <Product product={product} key={product.id} />;
              })}
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
};

export default Home;
