import { useState, useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, ChakraProvider, Flex, Box, Text, useToast } from "@chakra-ui/react";

import { InputTodo } from "./component/molecules/InputTodo";
import { TodoCard } from "./component/molecules/TodoCard";
import axios from "axios";
import { EditTodo } from "./component/molecules/EditTodo";
import { TodoCardProps } from "./Type";
import { CompletedTodoCard } from "./component/molecules/CompletedTodoCard";

function App(){
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [incompleteTodos, setIncompleteTodos] = useState<TodoCardProps[]>([]);
  const [completedTodos, setCompletedTodos] = useState<TodoCardProps[]>([]);
  // console.log('editingTodoId',(editingTodoId))

  useEffect(() => {
    axios.get(`https://apitodo118satellite.azurewebsites.net/api/TodoItems`)

      .then(response => {
        const completed = response.data.filter((todo: TodoCardProps) => todo.status === 1);
        const incomplete = response.data.filter((todo: TodoCardProps) => todo.status === 0);
        setCompletedTodos(completed);
        setIncompleteTodos(incomplete);
      })
      .catch(error => {
        console.error("Todoの取得に失敗しました。", error);
      });
  }, []);
      // console.log(incompleteTodos);
      // console.log(completedTodos);

    const deleteTodo = async (id: number) => {
      try {
      await axios.delete(`https://apitodo118satellite.azurewebsites.net/api/TodoItems/${id}`);
      setIncompleteTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      setCompletedTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      }
      catch (error) {
        console.error("Todoの削除に失敗しました。", error);
        }
      };

      const handleComplete = async (completedTodoId: number) => {
        // console.log("handleComplete called with id:", completedTodoId);
        try {
          const response = await axios.put(`https://apitodo118satellite.azurewebsites.net/api/TodoItems/${completedTodoId}/markComplete`, {
            Status: 1
          });
          const updatedTodo = response.data;
          setIncompleteTodos(prevTodos => prevTodos.filter(todo => todo.id !== completedTodoId));
          setCompletedTodos(prevTodos => [...prevTodos, updatedTodo]);
          handleCompleteAlert();
        } catch (error) {
          console.error("Todoの完了処理に失敗しました。", error);
        }
        fetchCompleteTodos();
      }

      const handleInComplete = async (InCompleteTodoId: number) => {
        try {
          const response = await axios.put(`https://apitodo118satellite.azurewebsites.net/api/TodoItems/${InCompleteTodoId}/markIncomplete`, {
          Status: 0
          });

          // console.log("Updated todo:", response.data);
          const updatedTodo = response.data;
          setIncompleteTodos(prevTodos => [...prevTodos, updatedTodo])
          setCompletedTodos(prevTodos => prevTodos.filter(todo => todo.id !== InCompleteTodoId));
          handleInCompleteAlert();
        } catch (error) {
          console.error("Todoを未完了に戻せません。", error);
        }
        fetchInCompleteTodos();
      }

      const fetchInCompleteTodos = async () => {
        try {
          const response = await axios.get(`https://apitodo118satellite.azurewebsites.net/api/TodoItems?status=0`);
          setIncompleteTodos(response.data);
        } catch (error) {
            console.error("Todoの取得に失敗しました。", error);
        }
      }

      const fetchCompleteTodos = async () => {
        try {
          const response = await axios.get(`https://apitodo118satellite.azurewebsites.net/api/TodoItems?status=1`);
          setCompletedTodos(response.data);
          console.log(response.data)
        } catch (error) {
            console.error("Todoの取得に失敗しました。", error);
        }
      }

      const toast = useToast();

      const handleCompleteAlert = () => {
        toast({
          title: "Todoを完了しました。",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      };

      const handleInCompleteAlert = () => {
        toast({
          title: "Todoを未完了に戻しました。",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
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
            <InputTodo
            setIncompleteTodos={setIncompleteTodos}
            />
            </Box>
           </Flex>
      <Flex gap={5}>
        <Box m={5}>
        </Box>
        <Tabs variant='enclosed'>
            <TabList>
                <Tab>全てのTodo</Tab>
                <Tab>未完了Todo</Tab>
                <Tab>完了Todo</Tab>
            </TabList>
            <TabPanels>
            <TabPanel>
                <Flex gap={5}>
                <Box>
          <Flex>
          <Box m={10}>
          <Text>未完了Todo</Text>
          {incompleteTodos.map((todo) => (
            <TodoCard
             key={todo.id}
             id={todo.id}
             title={todo.title}
             content={todo.content}
             dateTime={todo.dateTime}
             status={todo.status}
             onDelete={() => deleteTodo(todo.id)}
             onEdit={() => handleEdit(todo.id)}
             onComplete={() => handleComplete(todo.id)}
            />
          ))}
          </Box>
          <Box m={10}>
          <Text>完了Todo</Text>
          {completedTodos.map((todo) => (
            <CompletedTodoCard
            key={todo.id}
            id={todo.id}
            title={todo.title}
            content={todo.content}
            dateTime={todo.dateTime}
            onInComplete={() => handleInComplete(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
            />
          ))}
          </Box>
          </Flex>
        </Box>
                </Flex>
            </TabPanel>
            <TabPanel>
            <Text>未完了Todo</Text>
            {incompleteTodos.map((todo) => (
            <TodoCard
             key={todo.id}
             id={todo.id}
             title={todo.title}
             content={todo.content}
             dateTime={todo.dateTime}
             status={todo.status}
             onDelete={() => deleteTodo(todo.id)}
             onEdit={() => handleEdit(todo.id)}
             onComplete={() => handleComplete(todo.id)}
            />
          ))}
            </TabPanel>
            <TabPanel>
            <Text>完了Todo</Text>
            {completedTodos.map((todo) => (
            <CompletedTodoCard
            key={todo.id}
            id={todo.id}
            title={todo.title}
            content={todo.content}
            dateTime={todo.dateTime}
            onInComplete={() => handleInComplete(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
            />
          ))}
            </TabPanel>
            </TabPanels>
        </Tabs>

        {isEditModalOpen && (
          <EditTodo
          editingTodoId={editingTodoId}
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          setIncompleteTodos={setIncompleteTodos}
          />
        )
        }
      </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;