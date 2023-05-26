import GreenButton from '@/components/Elements/Buttons/GreenButton';
import UserPreview from '../../../../components/Elements/UserPreview';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionsAuth, selectAuth } from '@/store/reducers/auth';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks.ts';
import { Link } from 'react-router-dom';
import GrayButton from '@/components/Elements/Buttons/GrayButton';

const AuthenticatedGroup = () => {
  const { logout } = bindActionCreators(actionsAuth, useAppDispatch());
  const { user } = useAppSelector(selectAuth);
  if (!user) throw new Error('There is no authenticated user');
  const logoutFunc = () => {
    logout();
    localStorage.removeItem('token');
  };
  return (
    <>
      <GreenButton size="small">
        <Link to={'/new-article'}>Create article</Link>
      </GreenButton>
      <Link to={'/profile'}>
        <UserPreview author={user} />
      </Link>
      <GrayButton size="large" onClick={logoutFunc}>
        Log Out
      </GrayButton>
    </>
  );
};

export default AuthenticatedGroup;
