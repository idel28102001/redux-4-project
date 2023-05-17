import styles from './AuthGroup.module.scss';
import NotAuthenticatedGroup from '@/features/auth/components/AuthenticatedGroup';
import AuthenticatedGroup from '@/features/auth/components/NotAuthenticatedGroup';
import { useAppSelector } from '@/hooks/useStoreHooks.ts';
import { selectAuth } from '@/store/reducers/auth';

const AuthGroup = () => {
  const { isAuth } = useAppSelector(selectAuth);
  const content = isAuth ? <AuthenticatedGroup /> : <NotAuthenticatedGroup />;
  return <div className={styles.root}>{content}</div>;
};

export default AuthGroup;
