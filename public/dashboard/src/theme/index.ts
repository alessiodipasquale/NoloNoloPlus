// theme/index.js
import { extendTheme } from "@chakra-ui/react";
import Card from "./components/card";
import GenericTable from "./components/genericTable";
import Text from "./components/text";
import Flex from "./components/flex";
// Global style overrides
// import styles from "./styles"

// Foundational style overrides
// import borders from "./foundations/borders"

// Component style overrides

const overrides = {
  // styles,
  // borders,
  // Other foundational style overrides go here
  components: {
    GenericTable,
    Card,
    Text,
    // Other components go here
  },
};

export default extendTheme(overrides);
