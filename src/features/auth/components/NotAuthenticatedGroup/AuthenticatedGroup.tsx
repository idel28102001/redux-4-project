import GreenButton from '@/components/Elements/Buttons/GreenButton';
import DefaultButton from '@/components/Elements/Buttons/DefaultButton';
import UserInfo from '../../../../components/Elements/UserInfo';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionsAuth } from '@/store/reducers/auth';
import { useAppDispatch } from '@/hooks/useStoreHooks.ts';
import { Author } from '@/features/articles/api/getArticle.ts';

const AuthenticatedGroup = () => {
  const { setIsAuth } = bindActionCreators(actionsAuth, useAppDispatch());
  const author: null | Author = null;
  return (
    <>
      <GreenButton size="small">Create article</GreenButton>
      {author && <UserInfo author={author} />}
      <DefaultButton size="large" onClick={() => setIsAuth(false)}>
        Log Out
      </DefaultButton>
    </>
  );
};

export default AuthenticatedGroup;
