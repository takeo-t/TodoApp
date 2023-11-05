import { FC, useRef, useState } from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    Box,
    Text,
    Flex,
    Divider } from '@chakra-ui/react';
import { CompletedTodoCardProps } from '../../Type';
import { DeleteButton,ReturnButton } from '../atoms/Button';

export const CompletedTodoCard: FC<CompletedTodoCardProps> = ({ id, title, content, dateTime, onInComplete, onDelete }) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const cancelRef = useRef<HTMLButtonElement>(null);
  
    const onClose = () => setIsAlertOpen(false);
  
    const deleteTodo = () => {
      onDelete();
      onClose();
    };
    return (
    <>
    <Box
      borderWidth="1px"
      borderRadius="lg"
      bgColor="white"
      marginX="auto"
      p='5vw'
    >
      <Flex align="center" justify="space-between" mb={3}>
        <Text fontSize="xl" fontWeight="bold">
          {title}
        </Text>
        <Box>
          <Flex gap={1}>
          <ReturnButton onClick={() => onInComplete(id)}/>
          <DeleteButton onClick={() => setIsAlertOpen(true)} />
          </Flex>
        </Box>
      </Flex>
      <Divider mb={3}/>
      <Text mb={3}>
        {content}
      </Text>
      <Flex justify="flex-end" mt={3}>
        <Box>{dateTime}</Box>
      </Flex>
    </Box>

    <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Todoを削除
            </AlertDialogHeader>

            <AlertDialogBody>
              次の完了したTodoを削除してもよろしいですか？
              <br /><br />
              <Text fontSize="md" fontWeight="bold">{title}</Text>
              <Text fontSize="sm">{content}</Text>
              <br />
              この操作は元に戻せません。
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button colorScheme='red' onClick={deleteTodo} ml={3}>
                削除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
