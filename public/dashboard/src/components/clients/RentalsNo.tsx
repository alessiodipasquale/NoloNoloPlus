import React from 'react'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import { ClientWithRevenueAndDamage } from '../../@types/db-entities'

function RentalsNo({data}: {data : ClientWithRevenueAndDamage[]} ) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="user.rentals.length" />
              <YAxis dataKey="user.username" type="category" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="user.rentals.length"
                name="number of rentals"
                barSize={20}
                fill="#8884d8"
              />
            </BarChart>
          </ResponsiveContainer>
    )
}

export default RentalsNo
