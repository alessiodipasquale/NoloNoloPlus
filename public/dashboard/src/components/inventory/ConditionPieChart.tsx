import React, { PureComponent, useMemo } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  LabelList,
  Tooltip
} from "recharts";
import { Item } from "../../@types/db-entities";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {/* {`${(percent * 100).toFixed(0)}%`} */}
      {name}
    </text>
  );
};

function ConditionPieChart({ items, selected, setSelected }: { items: Item[], selected?: string, setSelected?: any }) {
  const itemsByStatus = useMemo(() => {
    return items.reduce<Record<string, Item[]>>((grouped, curr) => {
      grouped[curr.state] ?? (grouped[curr.state] = []);
      grouped[curr.state].push(curr);
      return grouped;
    }, {});
  }, [items]);

  console.log(Object.keys(itemsByStatus));
  
  const colors = scaleOrdinal(Object.keys(itemsByStatus), schemeCategory10);

  const data = Object.keys(itemsByStatus).map((key) => ({
    status: key,
    count: itemsByStatus[key].length,
  }));

  console.log(data)

  let renderLabel = function (entry: { status: string }) {
    return entry.status;
  };

  function toggleSelectedState(toSelect: string) {
    if (toSelect === selected) {
      setSelected(null);
    } else {
      setSelected(toSelect)
    }
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          dataKey="count"
          nameKey="status"
          startAngle={180}
          endAngle={0}
          data={data}
          cx="50%"
          cy="90%"
          outerRadius={80}
          fill="#0088FE"
          label={renderLabel}
        >
          {data.map((entry, index) => (
            <Cell  key={`cell-${index}`} fill={colors(entry.status)} onClick={setSelected && (() => toggleSelectedState(entry.status))} />
          ))}
        </Pie>
        <Tooltip />
        <LabelList position="insideTop" />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default ConditionPieChart;
