import { Grid, GridItem, Text } from "@chakra-ui/layout";
import React, { useEffect, useMemo, useState } from "react";

import type { Item, Rental } from "../../@types/db-entities";
import ItemScatterPlot from "./ItemScatterPlot";
import ItemTable from "./ItemTable";
import ConditionPieChart from "./ConditionPieChart";
import AvailableCard from "./AvailableCard";
import useFetch, { IncomingOptions } from "use-http";
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
import useDefaultOptions from "../../useDefaultOptions";
import { useAuth } from "../Login/AuthProvider";

function InventoryDash() {
  const {token} = useAuth()

  const [items, setItems] = useState<Item[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [selectedState, setSeletedState] = useState();

  const options = useDefaultOptions(token)
  
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
        h={{base: "auto", lg:"100vh"}}
        templateColumns={{base: "1fr", lg: "repeat(3, 1fr)"}}
        autoRows={{base: "240px", lg: "1fr"}}
        gap={3}
        padding={3}
      >
        <GridItem colSpan={1} rowSpan={1} as={Card}>
          <AvailableCard items={items} />
        </GridItem>

        <GridItem colSpan={1} rowSpan={1} as={Card}>
          <CardHeader>
            <Text variant="card-header">Available items</Text>
          </CardHeader>
          <ConditionPieChart selected={selectedState} setSelected={setSeletedState} items={items} />
        </GridItem>

        <GridItem colSpan={1} rowSpan={3} as={Card} overflowX="auto" alignItems="flex-start">
          {/* <RevenueByCategory items={items} rentals={rentals} /> */}
          <ItemTable data={filtered} />
        </GridItem>

        <GridItem colSpan={{base: 1, lg: 2}} rowSpan={2} as={Card}>
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
