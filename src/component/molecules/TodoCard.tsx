import { FC } from 'react';
import { Box, Text, Flex, Divider } from '@chakra-ui/react';
import { CompleteButton, DeleteButton, EditButton } from '../atoms/Button';
import { TodoCardProps } from '../../Type';

export const TodoCard: FC<TodoCardProps> = ({ title, content, dateTime, id, onDelete, onEdit }) => {

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
        <Box>
          <Flex gap={1}>
          <CompleteButton />
          <EditButton onClick={() => onEdit(id)}/>
          <DeleteButton onClick={onDelete}/>
          </Flex>
        </Box>
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

