import { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from '@chakra-ui/react'
import { InputTodo } from '../molecules/InputTodo'
import { IncompleteTodo } from './IncompleteTodo'
import { CompleteTodo } from './CompleteTodo'

export const TodoTabs = () => {
    // 仮のtodosリストと操作関数の例
    const [todos, setTodos] = useState([
        { title: 'Example Task', content: 'Do something', isCompleted: false, index: 0 }
    ]);
    const onToggleComplete = (index: number) => {
        // Toggle isCompleted property for the todo at the specified index
    };
    const onDelete = (index: number) => {
        // Remove the todo at the specified index
    };

    const addTodo = (title: string, content: string) => {
        const newTodo = {
            title,
            content,
            isCompleted: false,
            index: todos.length
        };
        setTodos([...todos, newTodo]);
    };

    return (
        <>
        <InputTodo onAdd={addTodo} />
        <Tabs variant='enclosed'>
            <TabList>
                <Tab>全てのTodo</Tab>
                <Tab>未完了Todo</Tab>
                <Tab>完了Todo</Tab>
            </TabList>
            <TabPanels>
            <TabPanel>
                <Flex gap={5}>
                    <IncompleteTodo todos={todos} onToggleComplete={onToggleComplete} onDelete={onDelete} />
                    <CompleteTodo />
                </Flex>
            </TabPanel>
            <TabPanel>
                <IncompleteTodo todos={todos} onToggleComplete={onToggleComplete} onDelete={onDelete}/>
            </TabPanel>
            <TabPanel>
                <CompleteTodo />
            </TabPanel>
            </TabPanels>
        </Tabs>
        </>
    )
}