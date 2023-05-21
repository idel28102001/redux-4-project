import { Layout } from 'antd';
import Head from '../../Head';
import styles from './MainLayout.module.scss';
import { Outlet, useNavigation } from 'react-router-dom';
import Spinner from '@/components/Elements/Loaders/Spinner/Spinner.tsx';
import { useAuthorization } from '@/hooks/useAuthorization.ts';

const { Content } = Layout;

const MainLayout = () => {
  useAuthorization();
  const navigation = useNavigation();
  const content = navigation.state === 'loading' ? <Spinner /> : <Outlet />;
  return (
    <Layout className={styles.root}>
      <Head />
      <Content className={styles.content}>{content}</Content>
    </Layout>
  );
};

export default MainLayout;
