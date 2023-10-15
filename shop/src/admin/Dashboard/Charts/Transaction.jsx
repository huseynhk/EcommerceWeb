import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Transaction = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/data");
      if (response.status !== 200) {
        console.log(error);
      } else {
        setData(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="w-[23rem] md:w-[50rem] lg:w-[72rem] h-[20rem] mb-6 border border-gray-300 dark:border-cyan-300 flex dark:bg-black rounded-sm">
        <div className="w-full mt-3 flex-1 text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={data} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Expense" fill="#7069f1" />
              <Bar dataKey="Income" fill="#3fef82" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Transaction;
