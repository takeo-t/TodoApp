import { Button } from "@chakra-ui/react"

export const CompleteButton = () => {
    return (
        <Button colorScheme='telegram' variant='outline'>
            完了
        </Button>
    )
}

export const DeleteButton = () => {
    return (
        <Button colorScheme='red' variant='outline'>
            削除
        </Button>
    )
}

export const EditButton = () => {
    return (
        <Button color='gray.400' variant='outline'>
            編集
        </Button>
    )
}

export const ReturnButton = () => {
    return (
        <Button colorScheme='gray.500' variant='outline'>
            戻す
        </Button>
    )
}

