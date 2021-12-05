import { Container, Flex, Text, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { subDays } from "date-fns";
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

function LineChartCard({ data }: any) {
  return (
    <Tabs as="figure" w="full" h="full" size="sm" align="end">

    <Flex justify="space-between">
      <Text as={"figcaption"}
      size="md"
      fontWeight="600">Revenue</Text>

      <TabList>
        <Tab>by week</Tab>
        <Tab>by month</Tab>
      </TabList>
    </Flex>

      <TabPanels w="full" h="full" >
        <TabPanel w="full" h="full" >
          <ResponsiveContainer width="99%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              //   margin={{
              //     top: 5,
              //     right: 30,
              //     left: 20,
              //     bottom: 5,
              //   }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </TabPanel>

        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default LineChartCard;