import { JSX } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button/button';
import styles from './DefaultButton.module.scss';

interface DefaultButtonProps extends ButtonProps {
  children: JSX.Element | string;
}

const DefaultButton = ({ children, ...rest }: DefaultButtonProps) => {
  return (
    <Button className={styles.root} {...rest}>
      {children}
    </Button>
  );
};

export default DefaultButton;
