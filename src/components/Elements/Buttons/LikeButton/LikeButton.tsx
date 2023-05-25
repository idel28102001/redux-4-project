import React, { FC } from 'react';
import styles from './LikeButton.module.scss';
import sprite from '@/assets/sprite.svg';

interface LikeButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  isLiked: boolean;
}

const LikeButton: FC<LikeButtonProps> = ({ isLiked, ...rest }) => {
  const path = isLiked ? 'heart-liked' : 'heart';
  return (
    <button {...rest} className={styles.root}>
      <svg className={styles.svg}>
        <use className={styles.use} xlinkHref={`${sprite}#${path}`} />
      </svg>
    </button>
  );
};

export default LikeButton;
