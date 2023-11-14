import { useState, useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, ChakraProvider, Flex, Box, Text, useToast } from "@chakra-ui/react";
import moment from "moment-timezone";

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
    axios.get(`${process.env.REACT_APP_API_URL}/api/TodoItems`)

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
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/TodoItems/${id}`);
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
          const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/TodoItems/${completedTodoId}/markComplete`, {
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
          const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/TodoItems/${InCompleteTodoId}/markIncomplete`, {
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
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/TodoItems?status=0`);
          setIncompleteTodos(response.data);
        } catch (error) {
            console.error("Todoの取得に失敗しました。", error);
        }
      }

      const fetchCompleteTodos = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/TodoItems?status=1`);
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
            <TabPanel width="1000px">
          <Flex gap={5}>
          <Box>
          <Flex gap={5}>
          <Box bg="blue.100" borderRadius="20px" pb={60}>
          <Box width="400px" m={10}>
          <Flex justifyContent="center" alignItems="center">
            <Text fontSize="2xl" fontWeight="bold" color="white">未完了Todo</Text>
          </Flex>
          {incompleteTodos.length > 0 ? (
            incompleteTodos.map((todo) => {
            
              const rawDate = todo.dateTime;
              const formattedDate = moment(rawDate).format('YYYY年MM月DD日HH時mm分');
              // console.log(formattedDate);
            return(
            <TodoCard
             key={todo.id}
             id={todo.id}
             title={todo.title}
             content={todo.content}
             dateTime={todo.dateTime}
             formattedDate={formattedDate}
             status={todo.status}
             onDelete={() => deleteTodo(todo.id)}
             onEdit={() => handleEdit(todo.id)}
             onComplete={() => handleComplete(todo.id)}
            />
          );
            })
          ) : (
            <Flex justifyContent="center" alignItems="center" height="300px">
            <Text textAlign="center" fontSize="lg" color="white">Todoがありません</Text>
            </Flex>
          )}
          </Box>
          </Box>

          <Box bg="gray.100" borderRadius="20px" pb={60}>
          <Box width="400px" m={10} >
          <Flex justifyContent="center" alignItems="center">
            <Text fontSize="2xl" fontWeight="bold" >完了Todo</Text>
          </Flex>
          {completedTodos.length > 0 ? (
           completedTodos.map((todo) => {

            const momentDate = moment(`${todo.completedAt}Z`);
            const jstCompletedAt = momentDate.tz('Asia/Tokyo').format('YYYY年MM月DD日 HH時mm分');
            // console.log("Converted JST date:", jstCompletedAt);

            return(
            <CompletedTodoCard
            key={todo.id}
            id={todo.id}
            title={todo.title}
            content={todo.content}
            jstCompletedAt={jstCompletedAt}
            onInComplete={() => handleInComplete(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
            />
            );
          })
          ) : (
          <Flex justifyContent="center" alignItems="center" height="300px">
          <Text textAlign="center" fontSize="lg">完了したTodoがありません</Text>
          </Flex>
          )}
          </Box>
          </Box>
          </Flex>
        </Box>
            </Flex>
            </TabPanel>
            <TabPanel width="1000px">
            <Box bg="blue.100" borderRadius="20px" pb={60}>
          <Box width="400px" m={10}>
          <Flex justifyContent="center" alignItems="center">
            <Text fontSize="2xl" fontWeight="bold" color="white">未完了Todo</Text>
          </Flex>
          {incompleteTodos.length > 0 ? (
            incompleteTodos.map((todo) => {
            
              const rawDate = todo.dateTime;
              const formattedDate = moment(rawDate).format('YYYY年MM月DD日HH時mm分');
              // console.log(formattedDate);
            return(
            <TodoCard
             key={todo.id}
             id={todo.id}
             title={todo.title}
             content={todo.content}
             dateTime={todo.dateTime}
             formattedDate={formattedDate}
             status={todo.status}
             onDelete={() => deleteTodo(todo.id)}
             onEdit={() => handleEdit(todo.id)}
             onComplete={() => handleComplete(todo.id)}
            />
          );
            })
          ) : (
            <Flex justifyContent="center" alignItems="center" height="300px">
            <Text textAlign="center" fontSize="lg" color="white">Todoがありません</Text>
            </Flex>
          )}
          </Box>
          </Box>
            </TabPanel>
          <TabPanel width="1000px">
          <Box bg="gray.100" borderRadius="20px" pb={60}>
          <Box width="400px" m={10} >
          <Flex justifyContent="center" alignItems="center">
            <Text fontSize="2xl" fontWeight="bold" >完了Todo</Text>
          </Flex>
          {completedTodos.length > 0 ? (
           completedTodos.map((todo) => {

            const momentDate = moment(`${todo.completedAt}Z`);
            const jstCompletedAt = momentDate.tz('Asia/Tokyo').format('YYYY年MM月DD日 HH時mm分');
            // console.log("Converted JST date:", jstCompletedAt);

            return(
            <CompletedTodoCard
            key={todo.id}
            id={todo.id}
            title={todo.title}
            content={todo.content}
            jstCompletedAt={jstCompletedAt}
            onInComplete={() => handleInComplete(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
            />
            );
          })
          ) : (
          <Flex justifyContent="center" alignItems="center" height="300px">
          <Text textAlign="center" fontSize="lg">完了したTodoがありません</Text>
          </Flex>
          )}
          </Box>
          </Box>
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