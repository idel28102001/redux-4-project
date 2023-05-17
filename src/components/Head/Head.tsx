import styles from './Head.module.scss';
import { Header } from 'antd/es/layout/layout';
import AuthGroup from '@/features/auth/components/AuthGroup';
import { Link } from 'react-router-dom';

const Head = () => {
  return (
    <Header className={styles.root}>
      <header className={styles.heading}>
        <Link to="/" className={styles.link}>
          Realworld Blog
        </Link>
      </header>
      <AuthGroup />
    </Header>
  );
};

export default Head;
