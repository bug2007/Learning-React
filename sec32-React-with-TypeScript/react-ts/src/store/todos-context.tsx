import React from 'react';
import Todo from '../models/todo'
import { useState } from 'react';

type TodosContextObj = {
        items: Todo[];   // defining the type of values that shud be in the items arr
        addTodo: (text: string) => void;   // defining func type
        removeTodo: (id: string) => void;
    }

export const TodosContext = React.createContext<TodosContextObj>({
        items: [],
        addTodo: () => {},
        removeTodo: (id: string) => {}
    })


const TodosContextProvider: React.FC = (props) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodoHandler = (todoText: string) => {
        const newTodo = new Todo(todoText);

        setTodos((prevTodos) => {
        return prevTodos.concat(newTodo); // returns a new arr. we shudnt mutate the exisiting arr
        });
    };

    const removeTodoHandler = (todoId: string) => {
        setTodos((prevTodos) => {
        return prevTodos.filter(todo => todo.id !== todoId)
        })
    }

    const contextValue: TodosContextObj = {
        items: todos,
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler
    }

    return <TodosContext.Provider value={contextValue}>
        {props.children}
    </TodosContext.Provider>
}

export default TodosContextProvider;