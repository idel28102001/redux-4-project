import { JSX } from 'react';
import { ButtonProps } from 'antd/es/button/button';
import DefaultButton from '@/components/Elements/Buttons/DefaultButton';

interface RedButtonProps extends ButtonProps {
  children: JSX.Element | string;
  isBig?: boolean;
}

const RedButton = ({ children, isBig, ...rest }: RedButtonProps) => {
  return (
    <DefaultButton isBig={isBig} danger {...rest}>
      {children}
    </DefaultButton>
  );
};

export default RedButton;
