import React, { useState } from 'react';
import { Button, FormLayout, FormItem, Input, FormLayoutGroup } from '@vkontakte/vkui';
import { useAppSelector } from '../store/hooks';

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

function Form({ title, handleClick }: FormProps) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const error = useAppSelector((state) => state.error.value);

  return (
    <FormLayout>
      <FormLayoutGroup>
        <FormItem
          top="E-mail"
          status={error.emailError ? 'error' : undefined}
          bottom={error.emailError}
        >
          <Input
            type="email"
            name="email"
            value={email}
            placeholder="enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormItem>
        <FormItem
          top="Password"
          status={error.passError ? 'error' : undefined}
          bottom={error.passError}
        >
          <Input
            type="password"
            placeholder="enter password"
            onChange={(e) => setPass(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Button size="l" onClick={() => handleClick(email, pass)} stretched>
            {title}
          </Button>
        </FormItem>
      </FormLayoutGroup>
    </FormLayout>
  );
}

export default Form;
