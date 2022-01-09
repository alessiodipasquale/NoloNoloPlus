import { schemeCategory10 } from "d3-scale-chromatic";
import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { Employee } from "../../@types/db-entities";
import ResponsiveFix from "../ResponsiveFix";

function RentalsNoBarChart({ data }: { data: Employee[] }) {
  return (
    <ResponsiveFix width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="username" />
        <YAxis stroke="#82ca9d" allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="rentals.length"
          name="number of rentals"
          fill={schemeCategory10[0]}
        />
      </BarChart>
    </ResponsiveFix>
  );
}

export default RentalsNoBarChart;
