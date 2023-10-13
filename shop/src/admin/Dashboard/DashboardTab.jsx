import React, { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { BiSolidCartAdd } from "react-icons/bi";
import { AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const DashboardTab = () => {
  const { filteredProducts, user } = useContext(ProductContext);
  const navigate = useNavigate();
  const addProductPage = () => {
    navigate("/addproduct");
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="tab container mx-auto ">
          <Tabs defaultIndex={0} className=" ">
            <TabList className="md:flex md:space-x-8 bg-  grid grid-cols-2 text-center gap-4  md:justify-center mb-10 ">
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
              <div className="  px-4 md:px-0 mb-16">
                <h1 className=" text-center mb-5 text-3xl font-semibold underline">
                  Product Details
                </h1>
                <div className=" flex justify-end">
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-blue-600  border hover:bg-blue-700 outline-0 font-medium rounded-lg text-sm py-2 px-4 m-6 transition duration-300 ease-in-out"
                  >
                    <div
                      className="flex gap-2 items-center"
                      onClick={addProductPage}
                    >
                      Add Product <BiSolidCartAdd size={30} />
                    </div>
                  </button>
                </div>
                <div className="relative overflow-x-auto ">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
                    <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]">
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
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>

                    {filteredProducts.map((item, index) => {
                      return (
                        <tbody className="" key={index}>
                          <tr className="bg-gray-50 border-b  dark:border-gray-700">
                            <td className="px-6 py-4 text-black ">
                              {index + 1}.
                            </td>
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap"
                            >
                              <img
                                className="w-16"
                                src={item.image}
                                alt="img"
                              />
                            </th>
                            <td className="px-6 py-4 text-black ">
                              {item.title}
                            </td>
                            <td className="px-6 py-4 text-black ">
                              ${item.price}
                            </td>
                            <td className="px-6 py-4 text-black ">
                              {item.category}
                            </td>
                            <td className="px-6 py-4 text-black ">
                              {item.stock}
                            </td>
                            <td className="px-6 py-4 text-black ">
                              {item.date}
                            </td>
                            <td className="px-6 py-4">
                              <div className=" flex gap-2">
                                <div className=" flex gap-2 cursor-pointer text-black ">
                                  <div
                                    className="text-2xl text-red-500"
                                    // onClick={() => deleteProduct(item)}
                                  >
                                    <AiFillDelete size={30} />
                                  </div>

                                  <Link to={`/updateproduct/${item.id}`}>
                                    <div className="text-2xl text-green-500">
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
            </TabPanel>

            <TabPanel>
              <div className="relative overflow-x-auto mb-10">
                <h1 className=" text-center mb-5 text-3xl font-semibold underline">
                  User Details
                </h1>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-black uppercase bg-gray-200 ">
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
                    {user.map((item, index) => (
                      <tr
                        className="bg-gray-50 border-b  dark:border-gray-700"
                        key={index}
                      >
                        <td className="px-6 py-4 text-black ">{index + 1}</td>
                        <td className="px-6 py-4 text-black ">{item.name}</td>
                        <td className="px-6 py-4 text-black ">{item.email}</td>
                        <td className="px-6 py-4 text-black ">{item.uid}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default DashboardTab;
