import { Grid, GridItem } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";

import type { Item } from "../../@types/db-entities";

const gridItemStyle = {
  padding: "24px",
  margin: "0",
  backgroundColor: "white",
  borderRadius: "md",
  overflow: "hidden",
};

function ClientsDash() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  //const [selectedRental, setSelectedRental] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetch(`items`, {
      headers: {
        authorization: "bearer " + process.env.REACT_APP_TOKEN,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json); //TODO: define type for database objects
        console.log(items);
        setIsLoading(false);
        return json;
      })
      .then((json) => console.log(json));
  }, []);

  return (
    <>
      <Grid
        minWidth="0"
        w="100%"
        h="100vh"
        templateColumns="Repeat(12, 1fr)"
        templateRows="Repeat(12, 1fr)"
        gap={3}
        padding={3}
      >
        <GridItem colSpan={4} rowSpan={4} {...gridItemStyle}>
            {/* New users */}
        </GridItem>
        <GridItem colSpan={4} rowSpan={4} {...gridItemStyle}></GridItem>

        <GridItem colSpan={4} rowSpan={4} {...gridItemStyle}></GridItem>

        <GridItem colSpan={8} rowSpan={8} {...gridItemStyle}>
            {/* graph showing tot rentals, revenue and damage per user */}
        </GridItem>
        <GridItem colSpan={4} rowSpan={8} {...gridItemStyle}></GridItem>
      </Grid>
    </>
  );
}

export default ClientsDash;
