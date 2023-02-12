import React, { useState } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';

function TodoPage() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<{ id: number; text: string; isCompleted: boolean }[]>([]);

  const addTodoHandler = () => {
    if (text) {
      const newTodo = {
        id: todos[todos.length - 1] ? todos[todos.length - 1].id + 1 : 0,
        text: text,
        isCompleted: false,
      };
      setTodos([...todos, newTodo]);
      setText('');
    }
  };

  const deleteTodoHandler = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodoHandler = (id: number) => {
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
