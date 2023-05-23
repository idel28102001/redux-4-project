import { JSX } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button/button';
import styles from './SubmitButton.module.scss';
import * as classNames from 'classnames';

interface SubmitButtonProps extends ButtonProps {
  children: JSX.Element | string;
  isArticle?: boolean;
}

const SubmitButton = ({ children, isArticle, ...rest }: SubmitButtonProps) => {
  return (
    <Button
      type="primary"
      htmlType="submit"
      className={classNames(styles.root, { [styles.article]: isArticle })}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
