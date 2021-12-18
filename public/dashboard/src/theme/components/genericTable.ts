const style = {
  // The parts of the component
  parts: ["Table", "TableCaption", "Thead", "Tr", "Th", "Tbody", "Tfoot"],
  // The base styles for each part
  baseStyle: {},
  // The size styles for each part
  sizes: {},
  // The variant styles for each part
  variants: {
    withHover: {
      Tr: {
        _hover: {
          boxShadow: "md",
          
        },
      },
    },
  },
  // The default `size` or `variant` values
  defaultProps: {},
};

export default style;
