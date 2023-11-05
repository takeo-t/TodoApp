import { useEffect, useRef, useState } from "react"
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
    FormControl,
    FormLabel,
    Textarea
} from "@chakra-ui/react"
import { TodoCardProps } from "../../Type";

interface EditTodoProps {
  editingTodoId: number | null;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (isOpen: boolean) => void;
  setIncompleteTodos: (todos: TodoCardProps[]) => void;
}

export const EditTodo = ({ editingTodoId, isEditModalOpen, setIsEditModalOpen, setIncompleteTodos }: EditTodoProps) => {
    const [editTodo, setEditTodo] = useState<TodoCardProps | null>(null);

    useEffect(() => {
      if(editingTodoId !== null){
        editTodoModal(editingTodoId);
      }
    }, [editingTodoId]);

    const editTodoModal = async (id: number) => {
      try {
        const response = await axios.get(`https://localhost:7208/api/TodoItems/${id}`);
        setEditTodo(response.data);}
      catch (error) {
        console.error("Todoの取得に失敗しました。", error);
      }
    }

        const initialRef = useRef<HTMLInputElement | null>(null)
        const finalRef = useRef<HTMLInputElement | null>(null)

        const [title, setTitle] = useState<string>("");
        const [content, setContent] = useState<string>("");
        const [dateTime, setDateTime] = useState<string>("");

        useEffect(() => {
          if (editTodo) {
            setTitle(editTodo.title);
            setContent(editTodo.content);
            setDateTime(editTodo.dateTime);
          }
        }, [editTodo]);


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
            id: editTodo?.id,
            title: title,
            content: content,
            dateTime: dateTime
          };

          try {
            if(editTodo){
            await axios.put(`https://localhost:7208/api/TodoItems/${editTodo.id}`, todo);
            await fetchTodos();
            handleClose();
          }
            }
           catch (error) {
            console.error('Error adding todo', error);
          }
        }

        const CrearText = () => {
          setTitle("");
          setContent("");
          setDateTime("");
          setError("");
        }

        const handleClose = () => {
          CrearText();
          setIsEditModalOpen(false);
        }

        const fetchTodos = async () => {
          try {
            const response = await axios.get('https://localhost:7208/api/TodoItems?status=0');
            setIncompleteTodos(response.data);
            console.log(setIncompleteTodos);
          } catch (error) {
              console.error("Todoの取得に失敗しました。", error);
          }
        }

    return (
        <>
                <Modal
                  initialFocusRef={initialRef}
                  finalFocusRef={finalRef}
                  isOpen={isEditModalOpen}
                  onClose={handleClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>ToDoを編集</ModalHeader>
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
                        更新
                      </Button>
                      <Button onClick={handleClose}>閉じる</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                </>
            )
        }