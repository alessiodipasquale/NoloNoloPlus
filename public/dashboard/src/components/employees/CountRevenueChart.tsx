import React, { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { Employee } from "../../@types/db-entities";

type UserRevenue = {
  user: Employee;
  totalRevenue: number;
};

function RevenueChart({data} : {data: UserRevenue[]}) {
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
        <XAxis dataKey="user.username" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="totalRevenue" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default RevenueChart