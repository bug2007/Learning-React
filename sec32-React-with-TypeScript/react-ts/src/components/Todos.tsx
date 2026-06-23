// function Todos(props: {items: string[], children}) {   // we know that props is an obj of all the attributes (including children. children is one of its keys) (key-value pairs format) in Todos. so we're defining here that we gonna receive items and that items shud be an arr of strings
//     return (
//         <ul>
//         </ul>
//     )
// }

// a better way to write:

// FC: we r saying that it's a functional component. and we r defining what the value of the 'items' key of the props obj shud look like 
const Todos: React.FC<{ items: string[] }> = (props) => {
    return (
        <ul>
            {props.items.map(item => <li key={item}>{item}</li>)}
        </ul>
    )
}

export default Todos;