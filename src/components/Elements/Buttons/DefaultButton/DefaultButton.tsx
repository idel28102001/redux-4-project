import { JSX } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button/button';
import styles from './DefaultButton.module.scss';
import * as classNames from 'classnames';

interface DefaultButtonProps extends ButtonProps {
  children: JSX.Element | string;
  isBig?: boolean;
}

const DefaultButton = ({ children, isBig, ...rest }: DefaultButtonProps) => {
  return (
    <Button className={classNames(styles.root, { [styles.big]: isBig })} {...rest}>
      {children}
    </Button>
  );
};

export default DefaultButton;
