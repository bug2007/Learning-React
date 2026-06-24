import NewTodo from "./components/NewTodo";
import Todos from "./components/Todos";
import TodosContextProvider from "./store/todos-context";
// import Todo from "./models/todo";

function App() {
  // const todos = [    // an arr of todo objs
  //   new Todo('Learn React'),
  //   new Todo('Learn TypeScript')
  // ]

  return (
    <TodosContextProvider>
      <NewTodo />
      {/* <Todos items={['Learn React', 'Learn TypeScript']} /> */}
      {/* <Todos items={todos} onRemoveTodo={removeTodoHandler} /> */}
      <Todos />
    </TodosContextProvider>
  );
}

export default App;
