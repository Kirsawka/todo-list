import React from 'react';
import Todo from './Todo';
import { List } from '@vkontakte/vkui';

interface TodoListProps {
  todos: { id: string; text: string; isCompleted: boolean }[];
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

function TodoList({ todos, deleteTodo, toggleTodo }: TodoListProps) {
  return (
    <List>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
      ))}
    </List>
  );
}

export default TodoList;
