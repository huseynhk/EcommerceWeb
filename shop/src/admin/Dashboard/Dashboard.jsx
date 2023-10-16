import React, { useEffect, useContext } from "react";
import { BsBagCheck, BsPieChart } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { SlBasketLoaded } from "react-icons/sl";
import Layout from "../../components/layout/Layout";
import DashboardTab from "./DashboardTab";
import Transaction from "./Charts/Transaction";
import BuyerChart from "./Charts/BuyerChart";
import { ProductContext } from "../../contexts/ProductContext";
const Dashboard = () => {
  const { getAllProducts, getAllCategories } = useContext(ProductContext);

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);
  
  return (
    <Layout>
      <section className="text-blue-200  dark:bg-black">
        <div className="container px-5 mx-auto  mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
            <div className="bg-white dark:bg-gray-600 dark:text-white rounded-md p-4 border mt-4 border-gray-300 dark:border-cyan-300 flex items-center">
              <div className="h-12 w-12 rounded-full bg-sky-500 flex items-center justify-center">
                <BsBagCheck className="text-2xl text-white" />
              </div>
              <div className="pl-4">
                <span className="text-lg text-gray-500 font-medium dark:text-cyan-200">
                  Toatal Sales
                </span>
                <div className="flex items-center">
                  <strong className="text-lg text-gray-500 font-medium dark:text-cyan-200">
                    $79292.23
                  </strong>
                  <span className="text-md  font-medium text-green-300 pl-2">
                    +62
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-600 dark:text-white rounded-md p-4 border mt-4 border-gray-300 dark:border-cyan-300 flex items-center">
              <div className="h-12 w-12 rounded-full bg-gega-red flex items-center justify-center">
                <BsPieChart className="text-2xl text-white" />
              </div>
              <div className="pl-4">
                <span className="text-lg text-gray-500 font-medium dark:text-cyan-200">
                  Toatal Expenses
                </span>
                <div className="flex items-center">
                  <strong className="text-lg text-gray-500 font-medium dark:text-cyan-200">
                    $24251.32
                  </strong>
                  <span className="text-md  font-medium text-green-300 pl-2">
                    +88
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-600 dark:text-white rounded-md p-4 border mt-4 border-gray-300 dark:border-cyan-300 flex items-center">
              <div className="h-12 w-12 rounded-full bg-gega-melon flex items-center justify-center">
                <FiUsers className="text-2xl text-white" />
              </div>
              <div className="pl-4">
                <span className="text-lg text-gray-500 font-medium dark:text-cyan-200">
                  Toatal Customers
                </span>
                <div className="flex items-center">
                  <strong className="text-lg text-gray-500 font-medium dark:text-cyan-200">
                    2575
                  </strong>
                  <span className="text-md font-medium text-red-400 pl-2">
                    -11
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-600 dark:text-white rounded-md p-4 border mt-4 border-gray-300 dark:border-cyan-300 flex items-center">
              <div className="h-12 w-12 rounded-full bg-violet-500 flex items-center justify-center">
                <SlBasketLoaded className="text-2xl text-white" />
              </div>
              <div className="pl-4">
                <span className="text-lg text-gray-500 font-medium dark:text-cyan-200">
                  Toatal Orders
                </span>
                <div className="flex items-center">
                  <strong className="text-lg text-gray-500 font-medium dark:text-cyan-200">
                    4673
                  </strong>
                  <span className="text-md font-medium text-red-400 pl-2">
                    -12
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-around  mx-8 mb-4">
          <Transaction />
          <BuyerChart />
        </div>
        <DashboardTab />
      </section>
    </Layout>
  );
};

export default Dashboard;
