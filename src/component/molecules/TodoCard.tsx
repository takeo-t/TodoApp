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
  Divider,
  useToast } from '@chakra-ui/react';
import { CompleteButton, DeleteButton, EditButton, } from '../atoms/Button';
import { TodoCardProps } from '../../Type';

export const TodoCard: FC<TodoCardProps> = ({ id, title, content, dateTime, onDelete, onEdit, onComplete }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const onClose = () => setIsAlertOpen(false);

  const toast = useToast();

  const handleDelete = () => {
    onDelete(id);
    toast({
      title: "Todoを削除しました。",
      description: `${title}が削除されました。`,
      status: "info",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <>
    <Box
    borderWidth="1px"
    borderRadius="lg"
    bgColor="white"
    marginX="auto"
    p="30px"
    width="400px"
    height="300px"
      >
       <Text fontSize="xl" fontWeight="bold" mt={2} mb={1}>
        {title}
        </Text>
        <Divider mb={3}/>
        <Text mb={3} minHeight="100px">
          {content}
          </Text>
          <Box>
            完了予定日: {dateTime}
            </Box>
            <Flex justify="flex-end" mt={3} gap={1}>
              <CompleteButton onClick={() => onComplete(id)}/>
              <EditButton onClick={() => onEdit(id)}/>
              <DeleteButton onClick={() => setIsAlertOpen(true)} />
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
              次のTodoを削除してもよろしいですか？
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
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                削除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

