import React, { createContext, useState, useCallback, FC, ReactNode } from "react";
import { Todo, TodoContextType } from "../../Type";

export const TodoCardContext = createContext<TodoContextType | undefined>(undefined);

export const TodoCardProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = useCallback((todo: Todo) => {
        setTodos(prevTodos => [...prevTodos, todo]);
    }, []);

    const removeTodo = useCallback((index: number) => {
        setTodos(prevTodos => prevTodos.filter((_, todoIndex) => todoIndex !== index));
        //filter関数はprevTodos配列の各要素を一つずつ調べます。
        //各要素に対して、コールバック関数( _, todoIndex) => todoIndex !== indexが実行されます。
        //このコールバック関数は、現在の要素のインデックスtodoIndexがindexと異なる場合にtrueを返します。そして、todoIndexがindexと同じ場合はfalseを返します。
        //filterはtrueを返す要素だけを新しい配列に含めます。
        //結果として、indexで指定された要素だけが除外された新しい配列がsetTodosに渡され、ステートが更新されます。
        //このコードの目的は、indexで指定された位置のTodoをtodos配列から削除することです。
    }, []);

    const toggleComplete = useCallback((index: number) => {
        setTodos(prevTodos => prevTodos.map((todo, todoIndex) => {
            if(todoIndex === index){
                return { ...todo, isCompleted: !todo.isCompleted };
            }
            return todo;
        }))
    }, []);

    return (
        <TodoCardContext.Provider value={{ todos, addTodo, removeTodo, toggleComplete}}>
            {children}
        </TodoCardContext.Provider>
    );
};