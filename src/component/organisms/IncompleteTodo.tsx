import { FC } from "react";
import { Box, Text, Stack } from "@chakra-ui/react"
import { TodoCard } from "../molecules/TodoCard"

interface Todo {
    title: string;
    content: string;
    isCompleted: boolean;
    index: number;
}

interface IncompleteTodoProps {
    todos: Todo[];
    onToggleComplete: (index: number) => void;
    onDelete: (index: number) => void;
}

export const IncompleteTodo:FC<IncompleteTodoProps> = ({ todos, onToggleComplete, onDelete }) => {
    return (
        <Box
        borderWidth="10px"
        borderRadius="30px"
        bgColor="gray.200"
        borderColor="gray.200"
        >
        <Text align="center" fontSize="xl" fontWeight="bold" mb={4}>未完了Todo</Text>
        <Stack spacing={4}>
        {todos.filter(todo => !todo.isCompleted).map(todo => (
          <TodoCard
            key={todo.index}
            index={todo.index}
            title={todo.title}
            content={todo.content}
            isCompleted={todo.isCompleted}
            onToggleComplete={() => onToggleComplete(todo.index)}
            onDelete={() => onDelete(todo.index)}
          />
        ))}
        </Stack>
        </Box>
    )
}