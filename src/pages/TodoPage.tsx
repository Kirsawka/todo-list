import React, { useState } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUserTodos } from 'store/reducers/user';
import { getDatabase, ref, set } from 'firebase/database';

function TodoPage() {
  const user = useAppSelector((state) => state.user.value);
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const writeUserData = (
    userId: string,
    photoURL: string | null,
    todos: { id: number; text: string; isCompleted: boolean }[]
  ) => {
    const db = getDatabase();
    const reference = ref(db, userId);
    set(reference, {
      photoURL: photoURL,
      todos: todos,
    });
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
    const todos = user.todos.filter((todo) => todo.id !== id);
    dispatch(setUserTodos(todos));
    writeUserData(user.userId, user.photoURL, todos);
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
      <TodoList todos={user.todos} deleteTodo={deleteTodoHandler} toggleTodo={toggleTodoHandler} />
    </>
  );
}

export default TodoPage;
