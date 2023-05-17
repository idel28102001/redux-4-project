import styles from './Card.module.scss';
import * as classNames from 'classnames';

interface CardProps {
  children: JSX.Element | string | null;
  isForm: boolean;
}

const Card = ({ children, isForm }: CardProps) => {
  return <div className={classNames(styles.root, { [styles.form]: isForm })}>{children}</div>;
};

export default Card;
