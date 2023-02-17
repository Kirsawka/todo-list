import React from 'react';
import { SimpleCell, IconButton, Div } from '@vkontakte/vkui';
import { Icon24DeleteOutline, Icon24Done, Icon24DocumentListOutline } from '@vkontakte/icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUserTodos } from '../store/reducers/user';
import { writeUserData } from '../utils/writeUserData';

export interface TodoProps {
  todo: { id: number; text: string; isCompleted: boolean };
}

function Todo({ todo }: TodoProps) {
  let animationTimeout: ReturnType<typeof setTimeout>;
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  const deleteTodo = (id: number) => {
    setTimeout(() => {
      const todos = user.todos.filter((todo) => todo.id !== id);
      dispatch(setUserTodos(todos));
      writeUserData(user.userId, user.photoURL, todos);
    }, 0);
  };

  const toggleTodo = (id: number) => {
    const todos = user.todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : { ...todo }
    );
    dispatch(setUserTodos(todos));
    writeUserData(user.userId, user.photoURL, todos);
  };

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

  return (
    <Div className="animate">
      <SimpleCell
        className={todo.isCompleted ? 'completedTodo' : ''}
        multiline
        before={<Icon24DocumentListOutline />}
        after={
          <>
            <IconButton onClick={() => toggleTodo(todo.id)}>
              <Icon24Done fill="green" />
            </IconButton>
            <IconButton
              onClick={(e) => {
                animateDelete(e);
                deleteTodo(todo.id);
              }}
            >
              <Icon24DeleteOutline fill="red" />
            </IconButton>
          </>
        }
      >
        {todo.text}
      </SimpleCell>
    </Div>
  );
}

export default Todo;
