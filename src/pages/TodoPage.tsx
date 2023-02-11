import React, { useState } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import { v4 as uuidv4 } from 'uuid';

function TodoPage() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<{ id: string; text: string; isCompleted: boolean }[]>([]);

  const addTodoHandler = () => {
    if (text) {
      const newTodo = {
        id: uuidv4(),
        text: text,
        isCompleted: false,
      };
      setTodos([...todos, newTodo]);
      setText('');
    }
  };

  const deleteTodoHandler = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodoHandler = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : { ...todo }
      )
    );
  };

  const setTextHandler = (value: string) => {
    setText(value);
  };

  return (
    <>
      <TodoForm addTodo={addTodoHandler} setText={setTextHandler} text={text} />
      <TodoList todos={todos} deleteTodo={deleteTodoHandler} toggleTodo={toggleTodoHandler} />
    </>
  );
}

export default TodoPage;
