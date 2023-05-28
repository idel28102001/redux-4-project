import styles from './Header.module.scss';
import { Header as Head } from 'antd/es/layout/layout';
import AuthGroup from '@/features/auth/components/AuthGroup';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Head className={styles.root}>
      <header className={styles.heading}>
        <Link to="/" className={styles.link}>
          Realworld Blog
        </Link>
      </header>
      <AuthGroup />
    </Head>
  );
};

export default Header;
