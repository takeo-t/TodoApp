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