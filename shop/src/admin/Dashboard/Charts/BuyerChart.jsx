import React from 'react';
import { PieChart, Pie,  Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: "Male", value: 7256 },
  { name: "Female", value: 8551 },
  { name: "Tech", value: 11533 },
  { name: "Other", value: 4725 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const BuyerChart = () => {
  return (
    <>
      <div className=" w-[23rem] md:w-[50rem] lg:w-[13rem] h-[20rem] mb-6 border border-gray-300 dark:border-cyan-300  flex dark:bg-black rounded-sm">
        <div className="w-full mt-3 flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default BuyerChart;
