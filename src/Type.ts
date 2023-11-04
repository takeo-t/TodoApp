export interface Todo {
    title: string;
    content: string;
    isCompleted: boolean;
}

export interface TodoContextType {
    todos: Todo[]
    addTodo: (todo: Todo) => void;
    removeTodo: (index: number) => void;
    toggleComplete: (index: number) => void;
}

export interface TodoCardProps {
    id: number;
    title: string;
    content: string;
    dateTime: string;
    Status: 0 | 1;
    onDelete: () => void;
    onEdit: (id: number) => void;
    onComplete: (todoId: number) => void;
}

export interface CompletedTodoCardProps {
    title: string;
    content: string;
    dateTime: string;
}