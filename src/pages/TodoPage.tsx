import React from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';

function TodoPage() {
  return (
    <>
      <TodoForm />
      <TodoList />
    </>
  );
}

export default TodoPage;
