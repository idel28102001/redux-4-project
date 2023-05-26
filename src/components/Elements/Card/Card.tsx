import styles from './Card.module.scss';
import clsx from 'clsx';

interface CardProps {
  children: JSX.Element | string | null;
  isForm: boolean;
}

const Card = ({ children, isForm }: CardProps) => {
  return (
    <div
      className={clsx(styles.root, {
        [styles.form]: isForm,
      })}
    >
      {children}
    </div>
  );
};

export default Card;
