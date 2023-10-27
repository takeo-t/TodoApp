import { ChakraProvider, Flex, Box, Text } from "@chakra-ui/react";

import { TodoTabs } from "./component/organisms/TodoTabs";

function App(){
  return (
    <ChakraProvider>
      <Box mr={50}>
          <Flex ml={50} minWidth='max-content' alignItems='center' gap={2} justifyContent="space-between">
            <Text fontSize="70px" fontWeight="bold" color="blue.600">TODO <span style={{ color: 'black', fontSize: '30px' }}>APP</span></Text>
            <Box mr={50}>
            </Box>
           </Flex>
      <Flex gap={5}>
        <Box m={5}>
         <TodoTabs />
        </Box>
      </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;