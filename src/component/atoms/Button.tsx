import { FC } from "react";
import { Button } from "@chakra-ui/react"

interface ButtonProps {
    onClick?: () => void;
}

export const CompleteButton: FC<ButtonProps> = ({ onClick }) => {
    return (
        <Button colorScheme='telegram' variant='outline' onClick={onClick}>
            完了
        </Button>
    )
}

export const DeleteButton: FC<ButtonProps> = ({ onClick }) => {
    return (
        <Button colorScheme='red' variant='outline' onClick={onClick}>
            削除
        </Button>
    )
}

export const EditButton: FC<ButtonProps> = ({ onClick }) => {
    return (
        <Button color='gray.400' variant='outline' onClick={onClick}>
            編集
        </Button>
    )
}

export const ReturnButton: FC<ButtonProps> = ({ onClick }) => {
    return (
        <Button colorScheme='gray.500' variant='outline' onClick={onClick}>
            戻す
        </Button>
    )
}

