import GreenButton from '@/components/Elements/Buttons/GreenButton';
import DefaultButton from '@/components/Elements/Buttons/DefaultButton';
import UserInfo from '../../../../components/Elements/UserInfo';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionsAuth, selectAuth } from '@/store/reducers/auth';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks.ts';
import { Link } from 'react-router-dom';

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
      <GreenButton size="small">Create article</GreenButton>
      <Link to={'/profile'}>
        <UserInfo author={user} />
      </Link>
      <DefaultButton size="large" onClick={logoutFunc}>
        Log Out
      </DefaultButton>
    </>
  );
};

export default AuthenticatedGroup;
