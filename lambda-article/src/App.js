import { useState } from "react";
import { Box, Flex } from "rebass";
import "./App.css";
import TextBox from "./textbox";

function App() {
  const [document, setDocument] = useState(null);
  return (
    <Box
      sx={{
        px: 3,
      }}
    >
      <Flex mx={50}>
        <Box width={4 / 8} px={2}>
          <TextBox setDocument={setDocument}></TextBox>
        </Box>
        <Box width={1 / 15}></Box>
        <Box width={3 / 8} px={2}>
          <TextBox loadDocument={document} editable={false}></TextBox>
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
