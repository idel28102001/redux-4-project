import * as classNames from 'classnames';
import styles from './ContentLayout.module.scss';
import { Outlet } from 'react-router-dom';

interface ContentLayoutProps {
  isForm: boolean;
}

const ContentLayout = ({ isForm }: ContentLayoutProps) => {
  const root = classNames(styles.root, isForm && styles.isModal);
  return (
    <div className={root}>
      <Outlet />
    </div>
  );
};

export default ContentLayout;
