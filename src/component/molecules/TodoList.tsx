// types.ts
export interface Todo {
    id: string;
    title: string;
    content: string;
    dateTime: string; // 日付の文字列
    status?: string;
    completedAt?: string;
  }
  
  export interface TodoCardProps {
    todo: Todo;
    formattedDate: string;
    onDelete: () => void;
    onEdit: () => void;
    onComplete: () => void;
  }
  
  export interface CompletedTodoCardProps {
    todo: Todo;
    jstCompletedAt: string;
    onInComplete: () => void;
    onDelete: () => void;
  }
  

// TodoList.tsx
import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Todo, TodoCardProps, CompletedTodoCardProps } from './types';

interface TodoListProps {
  todos: Todo[];
  isEmptyMessage: string;
  renderTodoCard: (props: TodoCardProps | CompletedTodoCardProps) => JSX.Element;
}

const TodoList: React.FC<TodoListProps> = ({ todos, isEmptyMessage, renderTodoCard }) => {
  if (todos.length === 0) {
    return (
      <Flex justifyContent="center" alignItems="center" height="300px">
        <Text textAlign="center" fontSize="lg">{isEmptyMessage}</Text>
      </Flex>
    );
  }

  return (
    <>
      {todos.map((todo) => renderTodoCard({ todo, .../* 他の必要なprops */ }))}
    </>
  );
}

export default TodoList;
