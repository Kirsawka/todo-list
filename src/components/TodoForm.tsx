import React from 'react';
import { FormItem, IconButton, Input } from '@vkontakte/vkui';
import { Icon28AddCircleFillBlue } from '@vkontakte/icons';

interface TodoFormProps {
  text: string;
  addTodo: () => void;
  setText: (value: string) => void;
}

function TodoForm({ text, addTodo, setText }: TodoFormProps) {
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
