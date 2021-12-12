import React from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";
import { Rental } from "../../@types/db-entities";

enum conclusions {
  "reserved-but-never-started",
  "concluded-but-not-payed",
  "concluded-and-object-damaged",
}

function RentalConclusionsPie({ rentals }: { rentals: Rental[] }) {
  const instantOrBooked = rentals.reduce(
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
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="count"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        {/* <Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" /> */}
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default RentalConclusionsPie;
