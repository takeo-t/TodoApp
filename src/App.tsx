import { useState, useEffect } from "react";
import { ChakraProvider, Flex, Box, Text } from "@chakra-ui/react";

import { InputTodo } from "./component/molecules/InputTodo";
import { TodoCard, TodoCardProps } from "./component/molecules/TodoCard";
import axios from "axios";
import { EditTodo } from "./component/molecules/EditTodo";


function App(){
  const [todos, setTodos] = useState<TodoCardProps[]>([]);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

   useEffect(() => {
    axios.get('https://localhost:7208/api/TodoItems')
      .then(response => {
        setTodos(response.data)
      })
      .catch(error => {
        console.error("Todoの取得に失敗しました。", error);
      });
   }, []);

   const deleteTodo = async (id: number) => {
     try {
      await axios.delete(`https://localhost:7208/api/TodoItems/${id}`);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !==id));}
      catch (error) {
        console.error("Todoの削除に失敗しました。", error);
      }
     };

     const handleEdit = (id: number) => {
      setEditingTodoId(id);
      setIsEditModalOpen(true);
     }

  return (
    <ChakraProvider>
      <Box mr={50}>
          <Flex ml={50} minWidth='max-content' alignItems='center' gap={2} justifyContent="space-between">
            <Text fontSize="70px" fontWeight="bold" color="blue.600">TODO <span style={{ color: 'black', fontSize: '30px' }}>APP</span></Text>
            <Box mr={50}>
            <InputTodo />
            </Box>
           </Flex>
      <Flex gap={5}>
        <Box m={5}>
         {/* <TodoTabs /> */}
        </Box>
        <Box>
          {todos.map((todo, index) => (
            <TodoCard
             key={todo.id}
             id={todo.id}
             title={todo.title}
             content={todo.content}
             dateTime={todo.dateTime}
             isCompleted={todo.isCompleted}
             onDelete={() => deleteTodo(todo.id)}
             onEdit={() => handleEdit(todo.id)}
            />
          ))}
        </Box>

        {isEditModalOpen && (
          <EditTodo
          editingTodoId={editingTodoId}
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          />
        )
        }
      </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;