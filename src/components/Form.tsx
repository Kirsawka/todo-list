import React, { useState } from 'react';
import { Button, FormLayout, FormItem, Input, FormLayoutGroup } from '@vkontakte/vkui';

interface FormProps {
  handleClick: (email: string, password: string) => void;
}

function Form({ handleClick }: FormProps) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <FormLayout>
      <FormLayoutGroup>
        <FormItem top="E-mail">
          <Input
            type="email"
            name="email"
            value={email}
            placeholder="enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormItem>
        <FormItem top="Password">
          <Input
            type="password"
            placeholder="enter password"
            onChange={(e) => setPass(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Button size="l" onClick={() => handleClick(email, pass)} stretched>
            Sign In
          </Button>
        </FormItem>
      </FormLayoutGroup>
    </FormLayout>
  );
}

export default Form;
