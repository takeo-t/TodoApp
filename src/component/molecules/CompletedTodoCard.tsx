import { FC } from 'react';
import { Box, Text, Flex, Divider } from '@chakra-ui/react';
import { CompletedTodoCardProps } from '../../Type';

export const CompletedTodoCard: FC<CompletedTodoCardProps> = ({ title, content, dateTime }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      bgColor="white"
      marginX="auto"
      p='5vw'
    >
      <Flex align="center" justify="space-between" mb={3}>
        <Text fontSize="xl" fontWeight="bold">
          {title}
        </Text>
      </Flex>
      <Divider mb={3}/>
      <Text mb={3}>
        {content}
      </Text>
      <Flex justify="flex-end" mt={3}>
        <Box>{dateTime}</Box>
      </Flex>
    </Box>
  );
};
