import { FC, useContext } from 'react';
import { Box, Text, Flex, Divider } from '@chakra-ui/react';
import { CompleteButton, DeleteButton, EditButton } from '../atoms/Button';
import { TodoCardContext } from '../providers/TodoCardProvider';

export interface TodoCardProps {
  title: string;
  content: string;
  dateTime: string;
  index: number;
  isCompleted: boolean;
}

export const TodoCard: FC<TodoCardProps> = ({ title, content, dateTime, index }) => {
  const todoContext = useContext(TodoCardContext);

  if(!todoContext){
    throw new Error("TodoCardはTodoCardProvider内で使用する必要があります。")
  }

  const { removeTodo, toggleComplete } = todoContext;
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
          <CompleteButton onClick={() => toggleComplete(index)}/>
          <EditButton />
          <DeleteButton onClick={() => removeTodo(index)}/>
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

