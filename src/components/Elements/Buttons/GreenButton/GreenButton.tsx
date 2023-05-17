import { JSX } from 'react';
import styles from './GreenButton.module.scss';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button/button';

interface GreenButtonProps extends ButtonProps {
  children: JSX.Element | string;
}

const GreenButton = ({ children, ...rest }: GreenButtonProps) => {
  return (
    <Button type="primary" className={styles.root} {...rest}>
      {children}
    </Button>
  );
};

export default GreenButton;
