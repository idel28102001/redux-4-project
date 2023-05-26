import styles from './AuthGroup.module.scss';
import AuthenticatedGroup from '../AuthenticatedGroup';
import { useAppSelector } from '@/hooks/useStoreHooks.ts';
import { selectAuth } from '@/store/reducers/auth';

const AuthGroup = () => {
  const { isAuth } = useAppSelector(selectAuth);
  const content = isAuth ? <AuthenticatedGroup /> : <AuthenticatedGroup />;
  return <div className={styles.root}>{content}</div>;
};

export default AuthGroup;
