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
  Cell,
} from "recharts";
import { UserRevenue } from "../../@types/db-entities";
import ResponsiveFix from "../ResponsiveFix";


function RevenueChart({data} : {data: UserRevenue[]}) {
  return (
    <ResponsiveFix width="100%" height="100%">
      <BarChart
        data={data}
        aria-labelledby="Revenue by employee"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="user.username" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <Tooltip />
        <Legend aria-label="legend" aria-hidden="true"/>
        <Bar yAxisId="left" name="revenue" dataKey="totalRevenue" fill={schemeCategory10[2]}>
          {data.map((entry, index) => (
              <Cell  key={`cell-${index}`} aria-label={`User: ${entry.user.username}; revenue: ${entry.totalRevenue}`} />
            ))}
        </Bar>
      </BarChart>
    </ResponsiveFix>
  );
}

export default RevenueChart