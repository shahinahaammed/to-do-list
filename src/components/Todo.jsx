import React from 'react'

export const Todo = ({todo,toggleTodo}) => {
    const handleTodoClick = () =>{
        toggleTodo(todo.id)
    }
  return (
    <label>
        <input type="checkbox"  checked={todo.complete} onChange={handleTodoClick} />
        {todo.name}
        <br />
    </label>
  )
}
