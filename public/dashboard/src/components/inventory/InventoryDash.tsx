import { Grid, GridItem, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
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
import { Tabs, TabList, Tab, TabPanels, TabPanel, Icon } from "@chakra-ui/react";

import {MdScatterPlot} from "react-icons/md"


const gridItemStyle = {
  padding: "24px",
  margin: "0",
  backgroundColor: "white",
  borderRadius: "md",
  overflow: "hidden",
};

function InventoryDash() {
  const [items, setItems] = useState<Item[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);

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
          <ConditionPieChart items={items} />
        </GridItem>

        <GridItem colSpan={4} rowSpan={12} as={Card}>
          {/* <RevenueByCategory items={items} rentals={rentals} /> */}
          <ItemTable data={items} />
        </GridItem>

        <GridItem colSpan={8} rowSpan={8} as={Card}>
          <Tabs size='sm' align='end' width="full" h="full">
            <TabList>
              <Tab><Icon as={MdScatterPlot} aria-label="Show scatter-plot"/></Tab>
              <Tab>Two</Tab>
            </TabList>

            <TabPanels w="full" h="full">
              <TabPanel w="full" h="full">
              <ItemScatterPlot items={items} />
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
