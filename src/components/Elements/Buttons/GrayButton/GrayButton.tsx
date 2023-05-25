import { JSX } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button/button';
import styles from './GrayButton.module.scss';

interface GrayButtonProps extends ButtonProps {
  children: JSX.Element | string;
}

const GrayButton = ({ children, ...rest }: GrayButtonProps) => {
  return (
    <Button className={styles.root} {...rest}>
      {children}
    </Button>
  );
};

export default GrayButton;
