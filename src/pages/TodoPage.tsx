import React, { useState } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUserTodos } from 'store/reducers/user';
import { writeUserData } from '../utils/writeUserData';

function TodoPage() {
  const user = useAppSelector((state) => state.user.value);
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  let animationTimeout: ReturnType<typeof setTimeout>;

  const animateDelete = (e: React.MouseEvent) => {
    const animate = (e.target as HTMLElement).closest('.animate') as HTMLElement;
    const animateContentHeight = animate.children[0].clientHeight;
    animate.style.maxHeight = `${animateContentHeight}px`;
    animate.classList.remove('open');
    clearTimeout(animationTimeout);
    animationTimeout = setTimeout(() => {
      animate.style.maxHeight = '0';
    }, 0);
  };

  const addTodoHandler = () => {
    if (text) {
      const newTodo = {
        id: user.todos[user.todos.length - 1] ? user.todos[user.todos.length - 1].id + 1 : 0,
        text: text,
        isCompleted: false,
      };
      dispatch(setUserTodos([...user.todos, newTodo]));
      writeUserData(user.userId, user.photoURL, [...user.todos, newTodo]);
      setText('');
    }
  };

  const deleteTodoHandler = (id: number) => {
    setTimeout(() => {
      const todos = user.todos.filter((todo) => todo.id !== id);
      dispatch(setUserTodos(todos));
      writeUserData(user.userId, user.photoURL, todos);
    }, 1000);
  };

  const toggleTodoHandler = (id: number) => {
    const todos = user.todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : { ...todo }
    );
    dispatch(setUserTodos(todos));
    writeUserData(user.userId, user.photoURL, todos);
  };

  const setTextHandler = (value: string) => {
    setText(value);
  };

  return (
    <>
      <TodoForm addTodo={addTodoHandler} setText={setTextHandler} text={text} />
      <TodoList
        animate={animateDelete}
        todos={user.todos}
        deleteTodo={deleteTodoHandler}
        toggleTodo={toggleTodoHandler}
      />
    </>
  );
}

export default TodoPage;
