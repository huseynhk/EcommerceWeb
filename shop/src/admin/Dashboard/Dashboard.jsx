import React from "react";
import { FaUserSecret } from "react-icons/fa";
import Layout from "../../components/layout/Layout";
import DashboardTab from "./DashboardTab"

const Dashboard = () => {
  return (
    <Layout>
      <section className="text-blue-200 body-font mt-10 mb-10">
        <div className="container px-5 mx-auto mb-10">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div
                className=" border-2 hover:shadow-green-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl"
            
              >
                <div
                  className="text-green-500 w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24"
                >
                  <FaUserSecret size={50} />
                </div>
                <h2
                  className="title-font font-medium text-3xl text-black fonts1"
                >
                 4500
                </h2>
                <p
                  className=" text-green-500  font-bold"
                >
                  Total Products
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div
                className=" border-2 hover:shadow-green-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl"
        
              >
                <div
                  className="text-green-500 w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24"
                >
                  <FaUserSecret size={50} />
                </div>
                <h2
                  className="title-font font-medium text-3xl text-black fonts1"
                >
                 3427
                </h2>
                <p
                  className=" text-green-500  font-bold"
                >
                  Total Orders
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div
                className=" border-2 hover:shadow-green-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl"
            
              >
                <div
                  className="text-green-500 w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24"
                >
                  <FaUserSecret size={50} />
                </div>
                <h2
                  className="title-font font-medium text-3xl text-black fonts1"
                >
                 4356
                </h2>
                <p
                  className=" text-green-500  font-bold"
                >
                  Total Users
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div
                className=" border-2 hover:shadow-green-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl"
          
              >
                <div
                  className="text-green-500 w-12 h-12 mb-3 inline-block"
                  viewBox="0 0 24 24"
                >
                  <FaUserSecret size={50} />
                </div>
                <h2
                  className="title-font font-medium text-3xl text-black fonts1"
                >
                  7
                </h2>
                <p
                  className=" text-green-500  font-bold"
                >
                  Total Websites
                </p>
              </div>
            </div>
          </div>
        </div>
        <DashboardTab/>
      </section>
    </Layout>
  );
};

export default Dashboard;
