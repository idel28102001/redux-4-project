import { JSX } from 'react';
import styles from './GreenButton.module.scss';
import { ButtonProps } from 'antd/es/button/button';
import DefaultButton from '@/components/Elements/Buttons/DefaultButton';

interface GreenButtonProps extends ButtonProps {
  children: JSX.Element | string;
  isBig?: boolean;
}

const GreenButton = ({ children, isBig, ...rest }: GreenButtonProps) => {
  return (
    <DefaultButton isBig={isBig} type="primary" className={styles.root} {...rest}>
      {children}
    </DefaultButton>
  );
};

export default GreenButton;
