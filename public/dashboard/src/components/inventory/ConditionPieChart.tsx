import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, LabelList } from 'recharts';
import { date } from 'yup';
import { Item } from '../../@types/db-entities';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name } : any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {/* {`${(percent * 100).toFixed(0)}%`} */}
      {name}
    </text>
  );
};


function ConditionPieChart({ items } : { items: Item[]}) {
    
    const itemsByStatus = items.reduce<Record<string, Item[]>>((grouped, curr) => {
        grouped[curr.state] ?? (grouped[curr.state] = [])
        grouped[curr.state].push(curr)
        return grouped
    }, {})

    const data = Object.keys(itemsByStatus).map(key => {return {status: key, count: itemsByStatus[key].length}})
    console.log(itemsByStatus)

    let renderLabel = function(entry : { status: string }) {
        return entry.status;
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              dataKey="count"
              startAngle={180}
              endAngle={0}
              data={data}
              cx="50%"
              cy="90%"
              outerRadius={80}
              fill="#0088FE"
              label={renderLabel }
            />
             <LabelList dataKey="status" position="insideTop"  />
          </PieChart>
        </ResponsiveContainer>
    );
}


export default ConditionPieChart
