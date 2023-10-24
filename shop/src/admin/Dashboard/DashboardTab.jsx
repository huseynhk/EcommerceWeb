import React, { useState, useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  MdOutlineProductionQuantityLimits,
  MdOutlineCategory,
} from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { BiSolidCartAdd, BiCategoryAlt } from "react-icons/bi";
import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import moment from "moment";
import { useTranslation } from "react-i18next";

const DashboardTab = () => {
  const {
    filteredProducts,
    user,
    deleteProduct,
    categories,
    deleteCategory,
    subcategories,
    deleteSubCategory,
    orders,
  } = useContext(ProductContext);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const addProductPage = () => {
    navigate("/addproduct");
  };
  const addCategoryPage = () => {
    navigate("/addcategory");
  };
  const addSubCategoryPage = () => {
    navigate("/addsubcategory");
  };
  //Pagination
  const [pageNumber, setPageNumber] = useState(0);
  //Product Pagination
  const productsPerPage = filteredProducts.length == 0 ? 0 : 5;
  const pagesVisited = pageNumber * productsPerPage;
  const displayProducts = filteredProducts.slice(
    pagesVisited,
    pagesVisited + productsPerPage
  );
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //Categories Pagination
  const categoriesPerPage = categories.length == 0 ? 0 : 3;
  const pagesVisitedCategories = pageNumber * categoriesPerPage;
  const displayCategories = categories.slice(
    pagesVisitedCategories,
    pagesVisitedCategories + categoriesPerPage
  );
  const categoryPageCount = Math.ceil(categories.length / categoriesPerPage);
  const changeCategoryPage = ({ selected }) => {
    setPageNumber(selected);
  };

  //Sub Categories Pagination
  const subcategoriesPerPage = subcategories.length == 0 ? 0 : 3;
  const pagesVisitedSubCategories = pageNumber * subcategoriesPerPage;
  const displaySubCategories = subcategories.slice(
    pagesVisitedSubCategories,
    pagesVisitedSubCategories + subcategoriesPerPage
  );
  console.log(subcategories);
  const subcategoryPageCount = Math.ceil(
    subcategories.length / subcategoriesPerPage
  );
  const changeSubCategoryPage = ({ selected }) => {
    setPageNumber(selected);
  };

  //User Pagination
  const usersPerPage = user.length == 0 ? 0 : 3;
  const pagesVisitedUsers = pageNumber * usersPerPage;
  const displayUsers = user.slice(
    pagesVisitedUsers,
    pagesVisitedUsers + usersPerPage
  );
  const userPageCount = Math.ceil(user.length / usersPerPage);
  const changeUserPage = ({ selected }) => {
    setPageNumber(selected);
  };

  //Order Pagination
  const ordersPerPage = orders.length == 0 ? 0 : 3;
  const ordersVisitedUsers = pageNumber * ordersPerPage;
  const displayOders = orders.slice(
    ordersVisitedUsers,
    ordersVisitedUsers + ordersPerPage
  );
  const ordersPageCount = Math.ceil(orders.length / ordersPerPage);
  const changeOrdersPage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="tab container mx-auto pb-7">
          <Tabs defaultIndex={0} className=" ">
            <TabList className="md:flex md:space-x-8  grid grid-cols-2 text-center gap-4 md:justify-center mb-10 ">
              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 hover:shadow-purple-700 border-purple-500 text-purple-500 rounded-lg text-md md:text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-2  md:px-5 py-1.5 text-center bg-[#605d5d12] "
                >
                  <div className="flex gap-2 items-center">
                    <MdOutlineProductionQuantityLimits />
                    {t("products")}
                  </div>
                </button>
              </Tab>

              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 border-cyan-500 bg-[#605d5d12] text-cyan-500 rounded-lg text-md md:text-xl  hover:shadow-cyan-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]  px-2 md:px-5 py-1.5 text-center "
                >
                  <div className="flex gap-2 items-center">
                    <BiCategoryAlt /> {t("categories")}
                  </div>
                </button>
              </Tab>

              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 border-yellow-500 bg-[#605d5d12] text-yellow-500 rounded-lg text-md md:text-xl  hover:shadow-yellow-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]  px-2 md:px-5 py-1.5 text-center "
                >
                  <div className="flex gap-2 items-center">
                    <MdOutlineCategory /> {t("subCategory")}
                  </div>
                </button>
              </Tab>

              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-md md:text-xl  hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]  px-2 md:px-5 py-1.5 text-center "
                >
                  <div className="flex gap-2 items-center">
                    <FaUser /> {t("users")}
                  </div>
                </button>
              </Tab>

              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 border-blue-500 bg-[#605d5d12] text-blue-500 rounded-lg text-md md:text-xl  hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]  px-2 md:px-5 py-1.5 text-center "
                >
                  <div className="flex gap-2 items-center">
                    <FaUser /> {t("orders")}
                  </div>
                </button>
              </Tab>
            </TabList>

            <TabPanel>
              <div className="px-4 md:px-0 mb-16 ">
                <h1 className=" text-center mb-5 text-3xl font-semibold underline text-purple-500">
                  {t("prDetails")}
                </h1>
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-purple-500  border hover:opacity-90 outline-0 font-semibold rounded-md text-md py-2 px-5 mb-5 transition duration-500 ease-in-out"
                  >
                    <div
                      className="flex gap-2 items-center "
                      onClick={addProductPage}
                    >
                      {t("addProduct")}
                      <BiSolidCartAdd size={30} />
                    </div>
                  </button>
                </div>
                <div className="relative overflow-x-auto ">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-white ">
                    <thead className="text-xs border bg-gray-200 dark:text-cyan-300 dark:bg-gray-900">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          S.No
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {t("img")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {t("title")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {t("price")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {t("category")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {t("stock")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {t("rating")}
                        </th>

                        <th scope="col" className="px-6 py-3">
                          {t("brand")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {t("size")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {t("disCountPrice")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {t("color")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {t("gender")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {t("date")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                          {t("actions")}
                        </th>
                      </tr>
                    </thead>

                    {displayProducts.map((item, index) => {
                      const actualIndex = pagesVisited + index + 1;
                      return (
                        <tbody key={index}>
                          <tr className="bg-gray-100 dark:bg-primary dark:text-white  border-b  dark:border-cyan-300">
                            <td className="px-6 py-4 text-black dark:text-white">
                              {actualIndex}.
                            </td>
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                            >
                              <img
                                className=" w-[80px]  h-[70px] object-cover rounded-md"
                                src={item.image}
                                alt={item.title}
                              />
                            </th>
                            <td className="px-6 py-3">{item.title}</td>
                            <td className="px-6 py-3">${item.price}</td>
                            <td className="px-6 py-3">{item.category.name}</td>
                            <td className="px-6 py-3">{item.stock}</td>
                            <td className="px-6 py-3">{item.rating}</td>
                            <td className="px-6 py-3">{item.brand}</td>
                            <td className="px-6 py-3">{item.size}</td>
                            <td className="px-6 py-3">{item.disCountPrice}</td>
                            <td className="px-6 py-3">
                              <div
                                className="h-7 w-7 rounded-full"
                                style={{ backgroundColor: item.color }}
                              ></div>
                            </td>
                            <td className="px-6 py-3">{item.gender}</td>

                            <td className="px-6 py-3">
                              {moment(item.date).format("MM.DD.YYYY")}
                            </td>
                            <td className="px-6 py-4">
                              <div className=" flex gap-2">
                                <div className=" flex gap-2 cursor-pointer  ">
                                  <div
                                    className="text-2xl text-gega-red"
                                    onClick={() => deleteProduct(item.id)}
                                  >
                                    <AiFillDelete size={30} />
                                  </div>

                                  <Link to={`/updateproduct/${item.id}`}>
                                    <div className="text-2xl text-green-600">
                                      <AiFillPlusCircle size={30} />
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              </div>
              {/* pagination */}
              <div className="flex items-center justify-center ">
                <ReactPaginate
                  previousLabel={t("prv")}
                  nextLabel={t("next")}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"flex py-1 px-4 space-x-2"}
                  previousLinkClassName={"mr-2 p-2 "}
                  nextLinkClassName={"ml-2 p-2"}
                  disabledClassName={"text-gray-500 cursor-not-allowed"}
                  activeClassName={
                    "bg-cyan-500 text-white border border-cyan-500 rounded-sm px-2"
                  }
                />
              </div>
            </TabPanel>

            <TabPanel>
              <div className="relative overflow-x-auto mb-10">
                <h1 className=" text-center mb-5 text-3xl font-semibold underline text-cyan-500">
                  {t("ctDetails")}
                </h1>
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-cyan-500  border hover:opacity-90 outline-0 font-semibold rounded-md text-md py-2 px-5 mb-5 transition duration-500 ease-in-out"
                  >
                    <div
                      className="flex gap-2 items-center "
                      onClick={addCategoryPage}
                    >
                      {t("addCategory")}
                      <BiSolidCartAdd size={30} />
                    </div>
                  </button>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-black uppercase bg-gray-200 dark:text-cyan-300 dark:bg-gray-900">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        S.No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Id
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t("name")}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t("actions")}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {displayCategories.map((item, index) => {
                      const actualIndex = pagesVisitedCategories + index + 1;
                      return (
                        <tr
                          className="bg-gray-100 dark:bg-primary dark:text-white border-b 
                         dark:border-cyan-300"
                          key={index}
                        >
                          <td className="px-6 py-5">{actualIndex}</td>
                          <td className="px-6 py-5">{item.id}</td>
                          <td className="px-6 py-5">{item.name}</td>
                          <td className="px-6 py-4">
                            <div className=" flex gap-2">
                              <div className=" flex gap-2 cursor-pointer  ">
                                <div
                                  className="text-2xl text-gega-red"
                                  onClick={() => deleteCategory(item.id)}
                                >
                                  <AiFillDelete size={30} />
                                </div>

                                <Link to={`/updatecategory/${item.id}`}>
                                  <div className="text-2xl text-green-600">
                                    <AiFillPlusCircle size={30} />
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* pagination */}
              <div className=" flex items-center justify-center ">
                <ReactPaginate
                  previousLabel={t("prv")}
                  nextLabel={t("next")}
                  pageCount={categoryPageCount}
                  onPageChange={changeCategoryPage}
                  containerClassName={"flex py-1 px-4 space-x-2"}
                  previousLinkClassName={"mr-2 p-2 "}
                  nextLinkClassName={"ml-2 p-2"}
                  disabledClassName={"text-gray-500 cursor-not-allowed"}
                  activeClassName={
                    "bg-cyan-500 text-white border border-cyan-500 rounded-sm px-2"
                  }
                />
              </div>
            </TabPanel>

            <TabPanel>
              <div className="relative overflow-x-auto mb-10">
                <h1 className=" text-center mb-5 text-3xl font-semibold underline text-yellow-500">
                  {t("subDetails")}
                </h1>
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-yellow-500  border hover:opacity-90 outline-0 font-semibold rounded-md text-md py-2 px-5 mb-5 transition duration-500 ease-in-out"
                  >
                    <div
                      className="flex gap-2 items-center "
                      onClick={addSubCategoryPage}
                    >
                      {t("addSub")}
                      <BiSolidCartAdd size={30} />
                    </div>
                  </button>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-black uppercase bg-gray-200 dark:text-cyan-300 dark:bg-gray-900">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        S.No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Id
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t("name")}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t("actions")}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {displaySubCategories.map((item, index) => {
                      const actualIndex = pagesVisitedSubCategories + index + 1;
                      return (
                        <tr
                          className="bg-gray-100 dark:bg-primary dark:text-white border-b 
                         dark:border-cyan-300"
                          key={index}
                        >
                          <td className="px-6 py-5">{actualIndex}</td>
                          <td className="px-6 py-5">{item.id}</td>
                          <td className="px-6 py-5">{item.name}</td>
                          <td className="px-6 py-4">
                            <div className=" flex gap-2">
                              <div className=" flex gap-2 cursor-pointer  ">
                                <div
                                  className="text-2xl text-gega-red"
                                  onClick={() => deleteSubCategory(item.id)}
                                >
                                  <AiFillDelete size={30} />
                                </div>

                                <Link to={`/updatesubcategory/${item.id}`}>
                                  <div className="text-2xl text-green-600">
                                    <AiFillPlusCircle size={30} />
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* pagination */}
              <div className=" flex items-center justify-center ">
                <ReactPaginate
                  previousLabel={t("prv")}
                  nextLabel={t("next")}
                  pageCount={subcategoryPageCount}
                  onPageChange={changeSubCategoryPage}
                  containerClassName={"flex py-1 px-4 space-x-2"}
                  previousLinkClassName={"mr-2 p-2 "}
                  nextLinkClassName={"ml-2 p-2"}
                  disabledClassName={"text-gray-500 cursor-not-allowed"}
                  activeClassName={
                    "bg-cyan-500 text-white border border-cyan-500 rounded-sm px-2"
                  }
                />
              </div>
            </TabPanel>

            <TabPanel>
              <div className="relative overflow-x-auto mb-10">
                <h1 className=" text-center mb-5 text-3xl font-semibold underline  text-green-500">
                  {t("userDetails")}
                </h1>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-black uppercase bg-gray-200 dark:text-cyan-300 dark:bg-gray-900">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        S.No
                      </th>

                      <th scope="col" className="px-6 py-3">
                        {t("name")}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Uid
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {displayUsers.map((item, index) => {
                      const actualIndex = pagesVisitedUsers + index + 1;
                      return (
                        <tr
                          className="bg-gray-100 dark:bg-primary dark:text-white border-b 
                         dark:border-cyan-300"
                          key={index}
                        >
                          <td className="px-6 py-5">{actualIndex}</td>
                          <td className="px-6 py-5">{item.name}</td>
                          <td className="px-6 py-5">{item.email}</td>
                          <td className="px-6 py-5">{item.uid}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* pagination */}
              <div className=" flex items-center justify-center ">
                <ReactPaginate
                  previousLabel={t("prv")}
                  nextLabel={t("next")}
                  pageCount={userPageCount}
                  onPageChange={changeUserPage}
                  containerClassName={"flex py-1 px-4 space-x-2"}
                  previousLinkClassName={"mr-2 p-2 "}
                  nextLinkClassName={"ml-2 p-2"}
                  disabledClassName={"text-gray-500 cursor-not-allowed"}
                  activeClassName={
                    "bg-cyan-500 text-white border border-cyan-500 rounded-sm px-2"
                  }
                />
              </div>
            </TabPanel>

            <TabPanel>
              <div className="relative overflow-x-auto mb-10">
                <h1 className=" text-center mb-5 text-3xl font-semibold underline  text-blue-500">
                  {t("orderDetails")}
                </h1>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-black uppercase bg-gray-200 dark:text-cyan-300 dark:bg-gray-900">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        S.No
                      </th>

                      <th scope="col" className="px-6 py-3">
                        {t("product")}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t("prAmount")}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t("totalPr")}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t("disCountAmount")}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t("disCountPrice")}
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {t("userEmail")}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {displayOders.map((item, index) => {
                      const actualIndex = ordersVisitedUsers + index + 1;
                      return (
                        <tr
                          className="bg-gray-100 dark:bg-primary dark:text-white border-b 
                         dark:border-cyan-300"
                          key={index}
                        >
                          <td className="px-6 py-5">{actualIndex}</td>
                          <td className="px-6 py-5">
                            <img
                              className="w-[80px]  h-[70px] object-cover rounded-md"
                              src={item.order_items[0].image}
                              alt=""
                            />
                          </td>
                          <td className="px-6 py-5">
                            {item.order_items[0].amount}
                          </td>

                          <td className="px-6 py-5">{item.total_price}</td>
                          <td className="px-6 py-5">{item.discount_price}</td>
                          <td className="px-6 py-5">{item.total_price-item.discount_price}</td>
                          <td className="px-6 py-5">{item.user_email}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* pagination */}
              <div className=" flex items-center justify-center ">
                <ReactPaginate
                  previousLabel={t("prv")}
                  nextLabel={t("next")}
                  pageCount={ordersPageCount}
                  onPageChange={changeOrdersPage}
                  containerClassName={"flex py-1 px-4 space-x-2"}
                  previousLinkClassName={"mr-2 p-2 "}
                  nextLinkClassName={"ml-2 p-2"}
                  disabledClassName={"text-gray-500 cursor-not-allowed"}
                  activeClassName={
                    "bg-cyan-500 text-white border border-cyan-500 rounded-sm px-2"
                  }
                />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default DashboardTab;
