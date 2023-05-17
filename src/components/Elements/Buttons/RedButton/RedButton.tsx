import { JSX } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button/button';

interface RedButtonProps extends ButtonProps {
  children: JSX.Element | string;
}

const RedButton = ({ children, ...rest }: RedButtonProps) => {
  return (
    <Button danger {...rest}>
      {children}
    </Button>
  );
};

export default RedButton;
