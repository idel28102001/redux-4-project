import { JSX } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button/button';
import styles from './DefaultButton.module.scss';
import clsx from 'clsx';

interface DefaultButtonProps extends ButtonProps {
  children: JSX.Element | string;
  isBig?: boolean;
}

const DefaultButton = ({ children, isBig, ...rest }: DefaultButtonProps) => {
  return (
    <Button className={clsx(styles.root, { [styles.big]: isBig })} {...rest}>
      {children}
    </Button>
  );
};

export default DefaultButton;
