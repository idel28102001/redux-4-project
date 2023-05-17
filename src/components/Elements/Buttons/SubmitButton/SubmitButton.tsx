import { JSX } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button/button';
import styles from './SubmitButton.module.scss';

interface SubmitButtonProps extends ButtonProps {
  children: JSX.Element | string;
}

const SubmitButton = ({ children, ...rest }: SubmitButtonProps) => {
  return (
    <Button type="primary" htmlType="submit" className={styles.root} {...rest}>
      {children}
    </Button>
  );
};

export default SubmitButton;
