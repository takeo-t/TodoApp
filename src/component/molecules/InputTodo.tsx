import React from "react"
import { FC, useState } from "react";
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
    Textarea
} from "@chakra-ui/react"

interface InputTodoProps {
  onAdd: (title: string, content: string) => void;
}

export const InputTodo: FC<InputTodoProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
        const { isOpen, onOpen, onClose } = useDisclosure()
        const initialRef = React.useRef(null)
        const finalRef = React.useRef(null)
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
                      <FormControl>
                        <FormLabel>タイトル</FormLabel>
                        <Input ref={initialRef} placeholder='タイトルを入力' value={title} onChange={(e) => setTitle(e.target.value)} />
                      </FormControl>
          
                      <FormControl mt={4}>
                        <FormLabel>内容</FormLabel>
                        <Textarea placeholder='内容を入力（100文字以内）' value={content} onChange={(e) => setContent(e.target.value)} />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>完了予定</FormLabel>
                        <Input placeholder="Select Date and Time" size="md" type="datetime-local" />
                      </FormControl>

                    </ModalBody>
          
                    <ModalFooter>
                    <Button colorScheme='orange' mr={3} onClick={() => { onAdd(title, content); onClose(); }}>
                        追加
                    </Button>
                      <Button onClick={onClose}>閉じる</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                </>
            )
        }