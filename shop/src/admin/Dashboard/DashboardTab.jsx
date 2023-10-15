import React, { useState, useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { BiSolidCartAdd } from "react-icons/bi";
import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import moment from "moment";

const DashboardTab = () => {
  const { filteredProducts, user, deleteProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const addProductPage = () => {
    navigate("/addproduct");
  };

  //Pagination
  const [pageNumber, setPageNumber] = useState(0);
  //Product Pagination
  const productsPerPage = 5;
  const pagesVisited = pageNumber * productsPerPage;
  const displayProducts = filteredProducts.slice(
    pagesVisited,
    pagesVisited + productsPerPage
  );
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //User Pagination
  const usersPerPage = 3;
  const pagesVisitedUsers = pageNumber * usersPerPage;
  const displayUsers = user.slice(
    pagesVisitedUsers,
    pagesVisitedUsers + usersPerPage
  );
  const userPageCount = Math.ceil(user.length / usersPerPage);
  const changeUserPage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="tab container mx-auto ">
          <Tabs defaultIndex={0} className=" ">
            <TabList className="md:flex md:space-x-8  grid grid-cols-2 text-center gap-4  md:justify-center mb-10 ">
              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 hover:shadow-purple-700 border-purple-500 text-purple-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]  px-5 py-1.5 text-center bg-[#605d5d12] "
                >
                  <div className="flex gap-2 items-center">
                    <MdOutlineProductionQuantityLimits />
                    Products
                  </div>
                </button>
              </Tab>

              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl  hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]   px-5 py-1.5 text-center "
                >
                  <div className="flex gap-2 items-center">
                    <FaUser /> Users
                  </div>
                </button>
              </Tab>
            </TabList>

            <TabPanel>
              <div className="px-4 md:px-0 mb-16 ">
                <h1 className=" text-center mb-5 text-3xl font-semibold underline text-primary dark:text-cyan-400">
                  Product Details
                </h1>
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-blue-600 dark:bg-cyan-600  border hover:opacity-90 outline-0 font-semibold rounded-md text-md py-2 px-5 mb-5 transition duration-500 ease-in-out"
                  >
                    <div
                      className="flex gap-2 items-center "
                      onClick={addProductPage}
                    >
                      Add Product <BiSolidCartAdd size={30} />
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
                          Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Stock
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Rating
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
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
                                className=" w-[75px]  h-[75px] object-cover rounded-md"
                                src={item.image}
                                alt="img"
                              />
                            </th>
                            <td className="px-6 py-3">{item.title}</td>
                            <td className="px-6 py-3">${item.price}</td>
                            <td className="px-6 py-3">{item.category}</td>
                            <td className="px-6 py-3">{item.stock}</td>
                            <td className="px-6 py-3">{item.rating}</td>
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
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
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
                <h1 className=" text-center mb-5 text-3xl font-semibold underline  text-primary dark:text-green-400">
                  User Details
                </h1>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-black uppercase bg-gray-200 dark:text-cyan-300 dark:bg-gray-900">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        S.No
                      </th>

                      <th scope="col" className="px-6 py-3">
                        Name
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
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
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
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default DashboardTab;
