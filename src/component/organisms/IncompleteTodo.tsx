// import { FC } from "react";
// import { Box, Text, Stack } from "@chakra-ui/react"
// import { TodoCard } from "../molecules/TodoCard"
// import { TodoCardProps } from "../molecules/TodoCard";



// interface IncompleteTodoProps {
//     todos: TodoCardProps[];
//     onToggleComplete: (index: number) => void;
//     onDelete: (index: number) => void;
// }


// export const IncompleteTodo:FC<IncompleteTodoProps> = ({ todos, onToggleComplete, onDelete }) => {
//     return (
//         <Box
//         borderWidth="10px"
//         borderRadius="30px"
//         bgColor="gray.200"
//         borderColor="gray.200"
//         p="10vw"
//         >
//         <Text align="center" fontSize="xl" fontWeight="bold" mb={4}>未完了Todo</Text>
//         <Stack spacing={4}>
//         {todos.filter(todo => !todo.isCompleted).map(todo => (
//           <TodoCard
//             key={todo.index}
//             index={todo.index}
//             title={todo.title}
//             content={todo.content}
//             dateTime={todo.dateTime}
//             isCompleted={todo.isCompleted}
//             onDelete={() => deleteTodo(todo.index)}
//           />
//         ))}
//         </Stack>
//         </Box>
//     )
// }
export{}