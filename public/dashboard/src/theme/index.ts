// theme/index.js
import { extendTheme } from "@chakra-ui/react"
import GenericTable from "./components/genericTable"

// Global style overrides
//import styles from "./styles"

// Foundational style overrides
//import borders from "./foundations/borders"

// Component style overrides

const overrides = {
  //styles,
  //borders,
  // Other foundational style overrides go here
  components: {
    GenericTable,
    // Other components go here
  },
}

export default extendTheme(overrides)