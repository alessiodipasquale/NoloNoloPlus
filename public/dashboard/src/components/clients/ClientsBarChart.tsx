import React from "react";
import { ClientWithRevenueAndDamage } from "../../@types/db-entities";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from "recharts";

function ClientsBarChart( {clients} : {clients: ClientWithRevenueAndDamage[]}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={clients}
        margin={{
          top: 5,
          right: 30,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis type="number" dataKey="totalRevenue" />
        <XAxis dataKey="user.username" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalRevenue" barSize={20} fill="#8884d8" />
        <Bar dataKey="totalDamage" barSize={20} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ClientsBarChart