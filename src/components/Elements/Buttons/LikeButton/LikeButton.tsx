import React from 'react';
import styles from './LikeButton.module.scss';
import sprite from '@/assets/sprite.svg';

const LikeButton = ({ ...rest }: React.RefAttributes<HTMLButtonElement>) => {
  return (
    <button {...rest} className={styles.root} onClick={(e) => e.currentTarget.classList.toggle(styles.active)}>
      <svg className={styles.svg}>
        <use className={styles.use} xlinkHref={`${sprite}#heart`} />
      </svg>
    </button>
  );
};

export default LikeButton;
