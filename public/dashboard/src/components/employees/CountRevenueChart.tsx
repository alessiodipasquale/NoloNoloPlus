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

export function CountRevenueChart() {
  const [revenues, setRevenues] = useState<UserRevenue[]>([]);

  useEffect(() => {
    fetch("users/employers/revenue", {
      headers: {
        authorization: "bearer " + process.env.REACT_APP_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((json) => setRevenues(json))
      .then(json => console.log(json));
  }, []);

  const data = useMemo(() => {
    return revenues.map((value) => ({
      username: value.user.username,
      revenue: value.totalRevenue,
      rentalsNo: value.user.rentals.length,
    }));
  }, [revenues]);

  console.log(data);
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
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" allowDecimals={false}/>
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" />
        <Bar yAxisId="right" dataKey="rentalsNo" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}