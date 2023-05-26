import styles from './AuthGroup.module.scss';
import AuthenticatedGroup from '../AuthenticatedGroup';
import { useAppSelector } from '@/hooks/useStoreHooks.ts';
import { selectAuth } from '@/store/reducers/auth';
import NotAuthenticatedGroup from '@/features/auth/components/NotAuthenticatedGroup';

const AuthGroup = () => {
  const { isAuth } = useAppSelector(selectAuth);
  const content = isAuth ? <AuthenticatedGroup /> : <NotAuthenticatedGroup />;
  return <div className={styles.root}>{content}</div>;
};

export default AuthGroup;
