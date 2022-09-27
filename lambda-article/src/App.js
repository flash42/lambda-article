import { useState } from "react";
import { Box, Flex, Text } from "rebass";
import "./App.css";
import Editor from "./editor/editor";
import Renderer from "./editor/renderer";

function App() {
  const initialContent = {
    type: "doc",
    content: [],
  };
  const [document, setDocument] = useState(initialContent);
  
  return (
    <Box
      sx={{
        px: 3,
      }}
    >
      <Flex mx={50}>
        <Box width={4 / 8} px={2}>
          <Editor setDocument={setDocument} initialContent={initialContent}></Editor>
        </Box>
        <Box width={1 / 15}></Box>
        <Box width={3 / 8} px={2}>
          <Text>Preview</Text>
          <Renderer document={document}></Renderer>
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
