import { useRef, useState } from "react"
import axios from 'axios';
import {
    Input,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Textarea,
    useToast
} from "@chakra-ui/react"
import { TodoCardProps } from "../../Type";

interface InputTodoProps {
  setIncompleteTodos: (todos: TodoCardProps[]) => void;
}

export const InputTodo = ({ setIncompleteTodos }: InputTodoProps) => {
        const { isOpen, onOpen, onClose } = useDisclosure()
        const initialRef = useRef<HTMLInputElement | null>(null)
        const finalRef = useRef<HTMLInputElement | null>(null)

        const [title, setTitle] = useState<string>('');
        const [content, setContent] = useState<string>('');
        const [dateTime, setDateTime] = useState<string>('');

        const [error, setError] = useState<string | null>(null);

        const handleSetTitle = (value: string) => {
          setTitle(value);
          if (value.length <= 100) {
            setError(null);
          }
        };

        const handleSetContent = (value: string) => {
          setContent(value);
          if (value.length <= 100) {
            setError(null);
          }
        };

        const handleSubmit = async () => {
          if(title.length >= 100 || content.length >= 100){
            setError("タイトルまたは内容が100文字を超えています。");
            return;
          }
          const todo = {
            title: title,
            content: content,
            dateTime: dateTime
          };

          try {
            await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/TodoItems`, todo);
            await fetchTodos();
            handleClose();
          } catch (error) {
            console.error('Error adding todo', error);
          }
          handleSubmitAlert();
        }

        const CrearText = () => {
          setTitle("");
          setContent("");
          setDateTime("");
          setError("");
        }

        const handleClose = () => {
          CrearText();
          onClose();
        }

        const fetchTodos = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/TodoItems?status=0`);
            setIncompleteTodos(response.data);
          } catch (error) {
              console.error("Todoの取得に失敗しました。", error);
          }
        }

        const toast = useToast();

        const handleSubmitAlert = () => {
          toast({
            title: "Todoを追加しました。",
            status: "info",
            duration: 5000,
            isClosable: true,
          });
          onClose();
        }

    return (
        <>
               <Button size='lg' colorScheme='orange' color='white' onClick={onOpen}>ToDoを追加</Button>
                <Modal
                  initialFocusRef={initialRef}
                  finalFocusRef={finalRef}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>ToDoを追加</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                      <FormControl>
                        <FormLabel>タイトル</FormLabel>
                        <Input ref={initialRef} value={title} onChange={(e) => handleSetTitle(e.target.value)} placeholder='タイトルを入力' />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>内容</FormLabel>
                        <Textarea value={content} onChange={(e) => handleSetContent(e.target.value)}placeholder='内容を入力（100文字以内）'/>
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>完了予定</FormLabel>
                        <Input value={dateTime} onChange={(e) => setDateTime(e.target.value)}placeholder="Select Date and Time" size="md" type="datetime-local" />
                      </FormControl>

                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme='orange' mr={3} onClick={handleSubmit}>
                        追加
                      </Button>
                      <Button onClick={handleClose}>閉じる</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                </>
            )
        }