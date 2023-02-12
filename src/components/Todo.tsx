import React from 'react';
import { SimpleCell, IconButton } from '@vkontakte/vkui';
import { Icon24DeleteOutline, Icon24Done, Icon24DocumentListOutline } from '@vkontakte/icons';

export interface TodoProps {
  todo: { id: number; text: string; isCompleted: boolean };
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

function Todo({ todo, deleteTodo, toggleTodo }: TodoProps) {
  return (
    <SimpleCell
      className={todo.isCompleted ? 'completedTodo' : ''}
      multiline
      before={<Icon24DocumentListOutline />}
      after={
        <>
          <IconButton onClick={() => toggleTodo(todo.id)}>
            <Icon24Done fill="green" />
          </IconButton>
          <IconButton onClick={() => deleteTodo(todo.id)}>
            <Icon24DeleteOutline fill="red" />
          </IconButton>
        </>
      }
    >
      {todo.text}
    </SimpleCell>
  );
}

export default Todo;
