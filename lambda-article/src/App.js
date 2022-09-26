import "./App.css";
import { Box, Flex } from "rebass";
import TextBox from './textbox';
import { useState } from 'react';


function App() {
  const [document, setDocument] = useState(null);
  return (
    <Box
      sx={{
        maxWidth: 1300,
        mx: "auto",
        px: 3,
      }}
    >
      <Flex mx={50}>
        <Box width={5 / 8} px={2}>
            <TextBox setDocument={setDocument}></TextBox>
        </Box>
        <Box width={3 / 8} px={2}>
          <TextBox loadDocument={document} editable={false}></TextBox>
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
