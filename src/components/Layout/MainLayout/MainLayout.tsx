import { Layout } from 'antd';
import Head from '../../Head';
import styles from './MainLayout.module.scss';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout className={styles.root}>
      <Head />
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;
