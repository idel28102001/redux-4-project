import styles from './Spinner.module.scss';
import { Spin } from 'antd';

const Spinner = () => {
  return (
    <div className={styles.root}>
      <Spin size="large" className={styles.spin} />
    </div>
  );
};

export default Spinner;
