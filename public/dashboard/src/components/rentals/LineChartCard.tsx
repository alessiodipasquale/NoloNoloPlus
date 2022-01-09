import {
  Container,
  Flex,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { format, subDays } from "date-fns";
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Rental } from "../../@types/db-entities";
import ResponsiveFix from "../ResponsiveFix";
import {
  dateFormat,
  getRevenuePerMonth,
  getRevenuePerWeek,
} from "./fillMissingMissing";

function LineChartCard({ rentals }: { rentals: Rental[] }) {
  const revenueByWeek = getRevenuePerWeek(rentals).map((value) => ({
    revenue: value.revenue,
    date: format(value.date, dateFormat),
  }));

  const revenuesByMonth = getRevenuePerMonth(rentals).map((value) => ({
    revenue: value.revenue,
    date: format(value.date, "yyyy-MMM"),
  }));

  return (
    <Tabs as="figure" w="full" h="full" size="sm" align="end">
      <Flex justify="space-between">
        <Text as={"figcaption"} size="md" fontWeight="600">
          Revenue
        </Text>

        <TabList>
          <Tab>by week</Tab>
          <Tab>by month</Tab>
        </TabList>
      </Flex>

      <TabPanels w="full" h="full">
        <TabPanel w="full" h="full" minWidth="50px" minHeight="50px">
          <ResponsiveFix width="99%" height="99%" minWidth={1} minHeight={1}>
            <LineChart data={revenueByWeek} width={500} height={300}>
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
          </ResponsiveFix>
        </TabPanel>

        <TabPanel w="full" h="full" minWidth="50px" minHeight="50px">
          <ResponsiveFix width="99%" height="99%" minWidth={1} minHeight={1}>
            <LineChart
              width={500}
              height={300}
              data={revenuesByMonth}
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
          </ResponsiveFix>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default LineChartCard;
