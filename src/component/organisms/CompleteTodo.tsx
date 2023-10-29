import { TodoCard } from "../molecules/TodoCard"
import { Box, Text, Stack } from "@chakra-ui/react"

export const CompleteTodo = () => {
    return (
        <Box
        borderWidth="5px"
        borderRadius="30px"
        bgColor='blue.600'
        borderColor='blue.600'
        >
        <Stack spacing={4}>
        <Text align="center" fontSize="xl" fontWeight="bold" mb={4} color="white">完了Todo</Text>
        </Stack>
        </Box>
    )
}