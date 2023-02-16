import React from 'react';
import Todo from './Todo';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface TodoListProps {
  todos: { id: number; text: string; isCompleted: boolean }[];
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  animate: (e: React.MouseEvent) => void;
}

function TodoList({ todos, deleteTodo, toggleTodo, animate }: TodoListProps) {
  return (
    <TransitionGroup component={null}>
      {todos.map((todo) => (
        <CSSTransition key={todo.id} timeout={700} classNames="item">
          <Todo
            key={todo.id}
            todo={todo}
            animate={animate}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

export default TodoList;
