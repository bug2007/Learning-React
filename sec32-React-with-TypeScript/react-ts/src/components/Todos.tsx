import { useContext } from 'react';
// import Todo from '../models/todo';
import TodoItem from './TodoItem';
import classes from './Todos.module.css'
import { TodosContext } from '../store/todos-context';

// function Todos(props: {items: string[], children}) {   // we know that props is an obj of all the attributes (including children. children is one of its keys) (key-value pairs format) in Todos. so we're defining here that we gonna receive items and that items shud be an arr of strings
//     return (
//         <ul>
//         </ul>
//     )
// }

// a better way to write:

// FC: we r saying that it's a functional component. and we r defining what the value of the 'items' key of the props obj shud look like 
// const Todos: React.FC<{ items: string[] }> = (props) => {
//     return (
//         <ul>
//             {props.items.map(item => <li key={item}>{item}</li>)}
//         </ul>
//     )
// }


// const Todos: React.FC<{ items: Todo[]; onRemoveTodo: (id: string) => void }> = (props) => {   // items will be an arr of objs that fulfil the definition of the Todo class e.g objs that have 'id' and 'text' keys
    

//     return (
//         <ul className={classes.todos}>
//             {props.items.map((item) => 
//                 <TodoItem key={item.id} text={item.text} onRemoveTodo={props.onRemoveTodo.bind(null, item.id)} />  // bind allows to preconfigure a func
//             )}
//         </ul>
//     )
// }

const Todos: React.FC = () => {   // items will be an arr of objs that fulfil the definition of the Todo class e.g objs that have 'id' and 'text' keys
    const todosCtx = useContext(TodosContext)

    return (
        <ul className={classes.todos}>
            {todosCtx.items.map((item) => 
                <TodoItem key={item.id} text={item.text} onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)} />  // bind allows to preconfigure a func
            )}
        </ul>
    )
}

export default Todos;