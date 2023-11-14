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
    formattedDate: string;
    status: 0 | 1;
    completedAt? : string;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    onComplete: (todoId: number) => void;
}

export interface CompletedTodoCardProps {
    id: number;
    title: string;
    content: string;
    completedAt?: string;
    jstCompletedAt?: string;
    onInComplete: (todoId: number) => void;
    onDelete: (id: number) => void;
}