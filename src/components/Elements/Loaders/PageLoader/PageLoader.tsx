import styles from './PageLoader.module.scss';
import Spinner from '@/components/Elements/Loaders/Spinner/Spinner.tsx';

const PageLoader = () => {
  return (
    <div className={styles.root}>
      <Spinner />
    </div>
  );
};

export default PageLoader;
