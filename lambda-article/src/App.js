import "./App.css";
import Codebox from "./codebox";
import Basic from "./remirror";
import { Box, Flex } from "rebass";


function App() {
  return (
    <Box
      sx={{
        maxWidth: 1300,
        mx: "auto",
        px: 3,
      }}
    >
      <Flex mx={50}>
        <Box width={1 / 2} px={2}>
            {/* <TextBox></TextBox> */}
            <Codebox></Codebox>
            <Basic></Basic>
        </Box>
        <Box width={1 / 2} px={2}>
        
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
