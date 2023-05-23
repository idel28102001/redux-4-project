import { JSX } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button/button';
import styles from './GhostButton.module.scss';

interface GhostButtonProps extends ButtonProps {
  children: JSX.Element | string;
}

const GhostButton = ({ children, ...rest }: GhostButtonProps) => {
  return (
    <Button className={styles.root} size="large" type="primary" ghost {...rest}>
      {children}
    </Button>
  );
};

export default GhostButton;
