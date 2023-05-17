import React from 'react';
import LikeButton from '@/components/Elements/Buttons/LikeButton';
import styles from './LikeCounter.module.scss';

interface LikeCounterProps extends React.RefAttributes<HTMLButtonElement> {
  amount: number;
}

const LikeCounter = ({ amount, ...rest }: LikeCounterProps) => {
  return (
    <div className={styles.root}>
      <LikeButton {...rest} />
      <span className={styles.amount}>{amount}</span>
    </div>
  );
};

export default LikeCounter;
