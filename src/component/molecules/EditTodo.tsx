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
    Textarea,
    useToast
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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/TodoItems/${id}`);
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
          setError(null);

          let errors = [];
          if (!title.trim()) errors.push('タイトルを入力してください。');
          if (title.length >= 100) errors.push('タイトルは100文字以下としてください。');
          if (!content.trim()) errors.push('内容を入力してください。');
          if (content.length > 100) errors.push('内容は100文字以下としてください。');
          if (!dateTime.trim()) errors.push('完了予定日時を入力してください。');
          else {

              const selectedDateTime = new Date(dateTime);
              const currentDateTime = new Date();
              if (selectedDateTime < currentDateTime) {
                  errors.push('完了予定日時は現在時刻以降を指定してください。');
              }
          }
      
          if (errors.length > 0) {

            setError(errors.join(' '));

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
            await axios.put(`${process.env.REACT_APP_API_URL}/api/TodoItems/${editTodo.id}`, todo);
            await fetchTodos();
            toast({
              title: "ToDoを更新しました。",
              status: "success",
              duration: 5000,
              isClosable: true,
          });
        }
            } catch (error) {
              console.error('ToDoの更新に失敗しました。', error);
              setError('ToDoの更新に失敗しました。');
          }
          handleClose();
        };

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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/TodoItems?status=0`);
            setIncompleteTodos(response.data);
            console.log(setIncompleteTodos);
          } catch (error) {
              console.error("Todoの取得に失敗しました。", error);
          }

        }
        const toast = useToast();

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