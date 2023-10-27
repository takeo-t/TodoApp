import { TodoCard } from "../molecules/TodoCard"
import { Box, Text, Stack } from "@chakra-ui/react"

export const IncompleteTodo = () => {
    return (
        <Box
        borderWidth="10px"
        borderRadius="30px"
        bgColor="gray.200"
        borderColor="gray.200"
        >
        <Text align="center" fontSize="xl" fontWeight="bold" mb={4}>未完了Todo</Text>
        <Stack spacing={4}>
        <TodoCard
        title="タイトル"
        content="内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内"
        isCompleted={false} 
        />
        <TodoCard
        title="タイトル"
        content="内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内"
        isCompleted={false} 
        />
        <TodoCard
        title="タイトル"
        content="内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内内容100文字以内"
        isCompleted={false} 
        />
        </Stack>
        </Box>
    )
}