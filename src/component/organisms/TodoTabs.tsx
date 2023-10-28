import { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from '@chakra-ui/react'

import { IncompleteTodo } from './IncompleteTodo'
import { CompleteTodo } from './CompleteTodo'
import { InputTodo } from "../molecules/InputTodo";

export const TodoTabs = () => {

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
        <InputTodo onAdd={addTodo}/>
        <Tabs variant='enclosed'>
            <TabList>
                <Tab>全てのTodo</Tab>
                <Tab>未完了Todo</Tab>
                <Tab>完了Todo</Tab>
            </TabList>
            <TabPanels>
            <TabPanel>
                <Flex gap={5}>
                    <IncompleteTodo todos={todos} onDelete={onDelete} onToggleComplete={onToggleComplete} />
                    <CompleteTodo />
                </Flex>
            </TabPanel>
            <TabPanel>
                <IncompleteTodo todos={todos} onDelete={onDelete} onToggleComplete={onToggleComplete}/>
            </TabPanel>
            <TabPanel>
                <CompleteTodo />
            </TabPanel>
            </TabPanels>
        </Tabs>
        </>
    )
}