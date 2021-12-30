import React from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { Employee } from "../../@types/db-entities";

function RentalsNoBarChart( {data} : {data: Employee[]}) {
  return (
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
        <XAxis dataKey="username" />
        <YAxis
          stroke="#82ca9d"
          allowDecimals={false}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="rentals.length" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default RentalsNoBarChart;
