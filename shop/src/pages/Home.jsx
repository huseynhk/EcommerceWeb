import React, { useContext } from "react";
import Layout from "../components/layout/Layout";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";
import Hero from "../components/Hero";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";


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
    subcategories,
    selectedSubtCategory,
    setSubSelectedCategory,
    genders,
    selectedtGender,
    setSelectedGender,
    sizes,
    selectedtSize,
    setSelectedSize,
    brands,
    selectedtBrand,
    setSelectedBrand,
    colors,
    selectedColor,
    setSelectedColor,
  } = useContext(ProductContext);
  const { t } = useTranslation();

  return (
    <Layout>
      <>
        <Helmet>
          <title>Home Page</title>
        </Helmet>
        <Hero />
        <section className="py-4 dark:bg-black dark:text-gray-100 ">
          <div className="container flex flex-col  items-center justify-around ">
            <div
              className="rounded-sm bg-slate-200 dark:bg-slate-800
              flex-row  w-[440px] h-[210px]  
               mt-10  md:w-full md:h-[140px] md:ml-20"
            >
              <div className="my-2 md:flex ">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                  className="bg-gray-50 border md:mx-1 my-2 md:my-0 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("searchPr")}
                />
                <input
                  type="number"
                  value={filters.rating}
                  onChange={(e) =>
                    setFilters({ ...filters, rating: e.target.value })
                  }
                  className="bg-gray-50 border md:mx-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("rating")}
                />
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: e.target.value })
                  }
                  className="bg-gray-50 border my-2 md:my-0 md:mx-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("minPrice")}
                />
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: e.target.value })
                  }
                  className="bg-gray-50 border md:mx-1  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("maxPrice")}
                />
              </div>
              <div className="md:flex">
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 md:mx-1 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={sortProducts}
                >
                  <option value="title">{t("sortPr")}</option>

                  <option value="az">{t("azName")}</option>
                  <option value="za">{t("zaName")}</option>

                  <option value="low">{t("low")}</option>
                  <option value="high">{t("high")}</option>

                  <option value="azRating">{t("lowRating")}</option>
                  <option value="zaRating">{t("highRating")}</option>
                </select>

                <select
                  className="my-2 md:my-0 md:mx-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                     dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">{t("allCategories")} </option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <select
                  className="my-2 md:my-0 md:mx-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                     dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={selectedSubtCategory}
                  onChange={(e) => setSubSelectedCategory(e.target.value)}
                >
                  <option value="all">{t("allSub")}</option>
                  {subcategories.map((subcategory, index) => (
                    <option key={index} value={subcategory.id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>

                <select
                  className="my-2 md:my-0 md:mx-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                     dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={selectedtGender}
                  onChange={(e) => {
                    setSelectedGender(e.target.value);
                  }}
                >
                  <option value="all">{t("allGender")}</option>
                  {genders.map((gender, index) => (
                    <option key={index} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>

                <select
                  className="my-2 md:my-0 md:mx-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                     dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={selectedtSize}
                  onChange={(e) => {
                    setSelectedSize(e.target.value);
                  }}
                >
                  <option value="all">{t("allSizes")}</option>
                  {sizes.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </select>

                <select
                  className="my-2 md:my-0 md:mx-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                     dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={selectedtBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                  }}
                >
                  <option value="all">{t("allBrands")}</option>
                  {brands.map((brand, index) => (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>

                <select
                  className="my-2 md:my-0 md:mx-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                   dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                   dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  <option value="all">{t("allColors")}</option>
                  {colors.map((color, index) => (
                    <option
                      key={index}
                      value={color}
                      style={{ backgroundColor: color }}
                    >
                      <div>{color}</div>
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="bg-slate-700 dark:bg-slate-300 p-2 flex justify-center items-center rounded-sm my-1 dark:text-primary text-gray-200 w-full font-medium"
                onClick={resetFilters}
              >
                {t("reset")}
              </button>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[60px] mt-[450px] md:mt-[100px] 
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
