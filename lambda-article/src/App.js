import "./App.css";
import { Box, Flex } from "rebass";
import TextBox from './textbox';


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
        <Box width={5 / 8} px={2}>
            <TextBox></TextBox>

        </Box>
        <Box width={3 / 8} px={2}>
        
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
