import { useBreakpointValue } from "@chakra-ui/media-query";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10, schemeTableau10 } from "d3-scale-chromatic";
import React from "react";
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  Scatter,
  Label,
  LabelList,
} from "recharts";
import { Item } from "../../@types/db-entities";
import ResponsiveFix from "../ResponsiveFix";




export default function ItemScatterPlot({ items }: { items: Item[] }) {


  const itemsByCategory = items.reduce((grouped, item) => {
    item.category.forEach((category) => {
      grouped[category] ?? (grouped[category] = []);
      grouped[category].push(item);
    });
    return grouped;
  }, {} as { [category: string]: Item[] });
  
  console.log(itemsByCategory);
  
  const colors = scaleOrdinal(Object.keys(itemsByCategory), schemeTableau10);
  const label = useBreakpointValue({md:  <LabelList  dataKey="_id" position="right"/>})
  return (
    <ResponsiveFix>
      <ScatterChart
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="rentCount" type="number" name="rentals" allowDecimals={false}/>
        <YAxis dataKey="standardPrice" name="price" unit="$" />
        {/* <ZAxis dataKey="condition" range={[0,10]} name="condition" /> */}
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        {Object.keys(itemsByCategory).map((category) => (
          <Scatter
            name={category}
            data={itemsByCategory[category]}
            fill={colors(category)}
          >
           {label}
          </Scatter>
        ))}
      </ScatterChart>
    </ResponsiveFix>
  );
}

