import { Box } from "@chakra-ui/layout";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import React, { useMemo } from "react";
import {PieChart, Pie, Tooltip, Cell } from "recharts";
import { Rental } from "../../@types/db-entities";
import ResponsiveFix from "../ResponsiveFix";

enum conclusions {
  "reserved-but-never-started",
  "concluded-but-not-payed",
  "concluded-and-object-damaged",
}

function RentalConclusionsPie({ rentals }: { rentals: Rental[] }) {
  const instantOrBooked = useMemo(() => {
    rentals.reduce(
      (split, item) => {
        if (item.rentalType === "istantaneo") {
          split.istant.push(item);
        } else if (item.rentalType === "prenotazione") {
          split.booked.push(item);
        }
  
        return split;
      },
      {
        istant: [],
        booked: [],
      } as { istant: Rental[]; booked: Rental[] }
    );
  }, [rentals])

  const neverEffected = rentals.filter(
    (rental) =>
      rental.rentalType === "prenotazione" &&
      !rental.rentalCertification &&
      new Date(rental.startDate) < new Date()
  );
  const neverPayed = rentals.filter(
    (rental) =>
      new Date(rental.endDate) < new Date() &&
      rental.rentalCertification &&
      !rental.returnCertification
  );
  const damaged = rentals.filter((rental) => rental.damaged);
  const completed = rentals.filter((rental) => rental.returnCertification);

  const data = [
    { name: "completed", count: completed.length },
    { name: "never payed", count: neverPayed.length },
    { name: "never effected", count: neverEffected.length },
    { name: "damaged", count: damaged.length },
  ].filter(({count}) => count)


  const colors = scaleOrdinal(
    data.map(({ name }) => name),
    schemeCategory10
  );

  return (
    <ResponsiveFix width="99%" debounce={5}>
      <PieChart>
        <Pie
          dataKey="count"
          isAnimationActive
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={60}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors(entry.name)} />
          ))}
        </Pie>
        {/* <Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" /> */}
        <Tooltip />
      </PieChart>
      </ResponsiveFix>
  );
}

export default RentalConclusionsPie;
