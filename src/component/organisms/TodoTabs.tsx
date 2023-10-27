import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from '@chakra-ui/react'

import { IncompleteTodo } from './IncompleteTodo'
import { CompleteTodo } from './CompleteTodo'

export const TodoTabs = () => {
    return (
        <Tabs variant='enclosed'>
            <TabList>
                <Tab>全てのTodo</Tab>
                <Tab>未完了Todo</Tab>
                <Tab>完了Todo</Tab>
            </TabList>
            <TabPanels>
            <TabPanel>
                <Flex gap={5}>
                    <IncompleteTodo />
                    <CompleteTodo />
                </Flex>
            </TabPanel>
            <TabPanel>
                <IncompleteTodo />
            </TabPanel>
            <TabPanel>
                <CompleteTodo />
            </TabPanel>
            </TabPanels>
        </Tabs>
    )
}