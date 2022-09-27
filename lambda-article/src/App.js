import { useState } from "react";
import { Box, Flex, Heading } from "rebass";
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
      <Flex mx={30}>
        <Box width={5 / 8} px={2}>
          <Editor
            setDocument={setDocument}
            initialContent={initialContent}
          ></Editor>
        </Box>
        <Box width={3 / 8} mx={80}>
          <Heading>Preview</Heading>
          <Renderer document={document}></Renderer>
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
