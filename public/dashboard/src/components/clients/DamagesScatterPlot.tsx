import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  Cell,
} from "recharts";
import { IncomingOptions, useFetch } from "use-http";
import {
  ClientWithRevenueAndDamage,
} from "../../@types/db-entities";
import ResponsiveFix from "../ResponsiveFix";

type DamageRevenueDataPoint = {
  username: string;
  revenue: number;
  damage: number;
};

function DamagesScatterPlot({ clients }: any) {
  const colors = scaleOrdinal(schemeCategory10).range();
  const [chartData, setChartData] = useState<DamageRevenueDataPoint[]>([]);

  const options = {
    headers: { authorization: "Bearer " + process.env.REACT_APP_TOKEN },
    responseType: "json",
  } as IncomingOptions;

  const { data } = useFetch<ClientWithRevenueAndDamage[]>(
    "users/clients/revenue",
    options,
    [clients]
  );

  useEffect(() => {
    data &&
      setChartData(
        data.map(({ user, totalRevenue, totalDamage }) => ({
          username: user.username,
          damage: totalDamage,
          revenue: totalRevenue,
        }))
      );

      console.log(chartData)
  }, [data]);

  console.log(chartData)

  return (
    <ResponsiveFix width="100%" height="100%">
      <ScatterChart
        width={400}
        height={400}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="damage" name="damage" unit="$" />
        <YAxis type="number" dataKey="revenue" name="revenue" unit="$" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="Clients" data={chartData} fill="#8884d8">
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveFix>
  );
}

export default DamagesScatterPlot;
