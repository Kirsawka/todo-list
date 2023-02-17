import React, { useState } from 'react';
import { FormItem, IconButton, Input } from '@vkontakte/vkui';
import { Icon28AddCircleFillBlue } from '@vkontakte/icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUserTodos } from '../store/reducers/user';
import { writeUserData } from '../utils/writeUserData';

function TodoForm() {
  const user = useAppSelector((state) => state.user.value);
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const addTodo = () => {
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

  return (
    <FormItem className="add-todo-form" onKeyDown={(e) => e.keyCode === 13 && addTodo()}>
      <Input
        type="text"
        placeholder="add new todo"
        after={
          <IconButton onClick={addTodo}>
            <Icon28AddCircleFillBlue />
          </IconButton>
        }
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </FormItem>
  );
}

export default TodoForm;
