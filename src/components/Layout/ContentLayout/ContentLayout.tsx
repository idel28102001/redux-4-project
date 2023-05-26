import styles from './ContentLayout.module.scss';
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';

interface ContentLayoutProps {
  isForm: boolean;
}

const ContentLayout = ({ isForm }: ContentLayoutProps) => {
  const root = clsx(styles.root, isForm && styles.isModal);
  return (
    <div className={root}>
      <Outlet />
    </div>
  );
};

export default ContentLayout;
