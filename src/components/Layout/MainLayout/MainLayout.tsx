import { Layout } from 'antd';
import Header from '../../Header';
import styles from './MainLayout.module.scss';
import { Outlet, useNavigation } from 'react-router-dom';
import Spinner from '@/components/Elements/Loaders/Spinner/Spinner.tsx';
import { memo } from 'react';

const { Content } = Layout;

const MainLayout = memo(() => {
  const navigation = useNavigation();
  const content = navigation.state === 'loading' ? <Spinner /> : <Outlet />;
  return (
    <Layout className={styles.root}>
      <Header />
      <Content className={styles.content}>{content}</Content>
    </Layout>
  );
});

export default MainLayout;
