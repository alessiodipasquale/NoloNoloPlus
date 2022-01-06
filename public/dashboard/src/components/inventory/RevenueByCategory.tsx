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
import { Client, Item, Rental } from "../../@types/db-entities";
import ResponsiveFix from "../ResponsiveFix";


function RevenueByCategory({
  items,
  rentals,
}: {
  items: Item[];
  rentals: Rental[];
}) {

  console.log(items)

  const itemMap = new Map(items.map(item => [item._id, item]))

  const rentalsByCategory = rentals.reduce((map, rental) => {
    rental.itemId.forEach(id => {
      const item = itemMap.get(id)
      console.log(item)
      if (item) {
        item.category.forEach(category => {
          let set = map.get(category)
          set ?? (set = new Set())
          set.add(rental)
          map.set(category, set)
        })
      }
    })
    return map
  }, new Map<string, Set<Rental>>())

  const revenueByCategory = Array.from(rentalsByCategory).map(([category, rentals]) => ({
    category, 
    revenue: Array.from(rentals).reduce((acc, rental) => acc + rental.finalPrice, 0)
  })).sort((a, b) => b.revenue - a.revenue)

  return (
    <ResponsiveFix width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={revenueByCategory}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" dataKey="revenue" />
        <YAxis type="category" dataKey="category"/>
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#8884d8" />
      </BarChart>
    </ResponsiveFix>
  );
}

export default RevenueByCategory;
