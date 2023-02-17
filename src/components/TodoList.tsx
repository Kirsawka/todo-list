import React from 'react';
import Todo from './Todo';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useAppSelector } from '../store/hooks';

function TodoList() {
  const user = useAppSelector((state) => state.user.value);

  return (
    <TransitionGroup component={null}>
      {user.todos.map((todo) => (
        <CSSTransition key={todo.id} timeout={700} classNames="item">
          <Todo key={todo.id} todo={todo} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

export default TodoList;
