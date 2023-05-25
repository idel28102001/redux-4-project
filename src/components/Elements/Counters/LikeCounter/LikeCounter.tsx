import React from 'react';
import LikeButton from '@/components/Elements/Buttons/LikeButton';
import styles from './LikeCounter.module.scss';

interface LikeCounter
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  amount: number;
}

const LikeCounter = ({ amount, ...rest }: LikeCounter) => {
  return (
    <div className={styles.root}>
      <LikeButton {...rest} />
      <span className={styles.amount}>{amount}</span>
    </div>
  );
};

export default LikeCounter;
