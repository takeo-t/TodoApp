import { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Todo, TodoCardProps, CompletedTodoCardProps } from '../../Type';

interface TodoListProps {
  todos: Todo[];
  isEmptyMessage: string;
  renderTodoCard: (props: TodoCardProps | CompletedTodoCardProps) => JSX.Element;
}

export const TodoList: FC<TodoListProps> = ({ todos, isEmptyMessage, renderTodoCard }) => {
  if (todos.length === 0) {
    return (
      <Flex justifyContent="center" alignItems="center" height="300px">
        <Text textAlign="center" fontSize="lg">{isEmptyMessage}</Text>
      </Flex>
    );
  }
}


