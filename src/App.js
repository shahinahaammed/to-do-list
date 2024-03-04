import { useEffect, useRef, useState } from "react";
import TodoList from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState(()=>{const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return storedTodos ||[
    { id: 1, name: "Todo 1", complete: true },
  ]});
  const todoNameRef = useRef();

  const toggleTodo =(id)=>{
    const newTodos= [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prveTodo) => {
      return [...prveTodo, { id: uuidv4(), name: name, complete: true }];
    });
    todoNameRef.current.value = null;
    console.log(todos);
  };

  const handleClearTodos = () =>{
    const newTods = todos.filter(todo => !todo.complete)
    setTodos(newTods)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos} >Clear Complete </button>
      <div>{todos.filter(todo =>!todo.complete).length} Left TODOS</div>
    </>
  );
}

export default App;
