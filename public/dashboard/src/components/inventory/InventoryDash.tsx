import { Grid, GridItem, Text } from "@chakra-ui/layout";
import React, { useEffect, useMemo, useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";

import type { Item, Rental } from "../../@types/db-entities";
import ItemScatterPlot from "./ItemScatterPlot";
import ItemTable from "./ItemTable";
import ConditionPieChart from "./ConditionPieChart";
import AvailableCard from "./AvailableCard";
import useFetch, { IncomingOptions } from "use-http";
import RevenueByCategory from "./RevenueByCategory";
import CardHeader from "../cards/CardHeader";
import Card from "../cards/Card";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Icon,
} from "@chakra-ui/react";

import { MdBarChart, MdScatterPlot } from "react-icons/md";

function InventoryDash() {
  const [items, setItems] = useState<Item[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [selectedState, setSeletedState] = useState();

  const options = {
    headers: {
      authorization: "Bearer " + process.env.REACT_APP_TOKEN,
    },
    responseType: "json",
  } as IncomingOptions;

  const { get, response, loading } = useFetch(options);

  useEffect(() => {
    async function fetchRentals() {
      const rentals = (await get("rentals")) as Rental[];
      if (response.ok) setRentals(rentals);
    }
    fetchRentals();
  }, [get, response]);

  useEffect(() => {
    async function fetchRentals() {
      const items = (await get("items")) as Item[];
      if (response.ok) setItems(items);
    }
    fetchRentals();
  }, [get, response]);

  const filtered = useMemo(
    () =>
      items.filter((item) =>
        selectedState ? item.state === selectedState : true
      ),
    [items, selectedState]
  );

  return (
    <>
      <Grid
        w="auto"
        h="100vh"
        templateColumns="Repeat(12, 1fr)"
        templateRows="Repeat(12, 1fr)"
        gap={3}
        padding={3}
      >
        <GridItem colSpan={4} rowSpan={4} as={Card}>
          <AvailableCard items={items} />
        </GridItem>
        <GridItem colSpan={4} rowSpan={4} as={Card}>
          <CardHeader>
            <Text variant="card-header">Available items</Text>
          </CardHeader>
          <ConditionPieChart selected={selectedState} setSelected={setSeletedState} items={items} />
        </GridItem>

        <GridItem colSpan={4} rowSpan={12} as={Card}>
          {/* <RevenueByCategory items={items} rentals={rentals} /> */}
          <ItemTable data={filtered} />
        </GridItem>

        <GridItem colSpan={8} rowSpan={8} as={Card}>
          <Tabs size="sm" align="end" width="full" h="full">
            <TabList>
              <Tab>
                <Icon as={MdScatterPlot} aria-label="Show scatter-plot" />
              </Tab>
              <Tab>
                <Icon as={MdBarChart} aria-label="Show bar-chart" />
              </Tab>
            </TabList>

            <TabPanels w="full" h="full">
              <TabPanel w="full" h="full">
                <ItemScatterPlot items={filtered} />
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </>
  );
}

export default InventoryDash;
