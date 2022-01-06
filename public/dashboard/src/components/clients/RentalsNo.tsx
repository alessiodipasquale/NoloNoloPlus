import React from 'react'
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import { ClientWithRevenueAndDamage } from '../../@types/db-entities'
import ResponsiveFix from '../ResponsiveFix'

function RentalsNo({data}: {data : ClientWithRevenueAndDamage[]} ) {
    return (
        <ResponsiveFix width="100%" height="100%">
            <BarChart
              layout="vertical"
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
          </ResponsiveFix>
    )
}

export default RentalsNo
