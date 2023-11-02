import { useState, useEffect } from "react";
import { ChakraProvider, Flex, Box, Text } from "@chakra-ui/react";

// import { TodoTabs } from "./component/organisms/TodoTabs";
import { InputTodo } from "./component/molecules/InputTodo";
import { TodoCard, TodoCardProps } from "./component/molecules/TodoCard";
import axios from "axios";


function App(){
  const [todos, setTodos] = useState<TodoCardProps[]>([]);

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
      setTodos(prevTodos => prevTodos.filter(todo => todo.index !==id));}
      catch (error) {
        console.error("Todoの削除に失敗しました。", error);
      }
     };

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
             key={index}
             title={todo.title}
             content={todo.content}
             dateTime={todo.dateTime}
             index={index}
             isCompleted={todo.isCompleted}
             onDelete={() => deleteTodo(todo.index)}
            />
          ))}
        </Box>
      </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;