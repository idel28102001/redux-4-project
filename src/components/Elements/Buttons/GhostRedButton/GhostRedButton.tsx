import { JSX } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button/button';
import styles from './GhostRedButton.module.scss';

interface GhostButtonProps extends ButtonProps {
  children: JSX.Element | string;
}

const GhostRedButton = ({ children, ...rest }: GhostButtonProps) => {
  return (
    <Button className={styles.root} danger size="large" type="primary" ghost {...rest}>
      {children}
    </Button>
  );
};

export default GhostRedButton;
