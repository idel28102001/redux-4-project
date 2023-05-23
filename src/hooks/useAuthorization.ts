import { bindActionCreators } from '@reduxjs/toolkit';
import { actionsAuth } from '@/store/reducers/auth';
import { useAppDispatch } from '@/hooks/useStoreHooks.ts';
import { useLayoutEffect } from 'react';
import { loadUser } from '@/features/auth/api/loadUser.ts';

export const useAuthorization = () => {
  const { setFirstLoading } = bindActionCreators(actionsAuth, useAppDispatch());
  useLayoutEffect(() => {
    loadUser().then((e) => setFirstLoading({ user: e, isLoading: false, isAuth: !!e }));
  }, []);
};
