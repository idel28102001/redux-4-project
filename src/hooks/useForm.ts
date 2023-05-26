import { AsyncThunk } from '@reduxjs/toolkit';
import { ResponseUser, UserInfo } from '@/features/auth/api/types.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks.ts';
import { selectAuth } from '@/store/reducers/auth';
import { useClearForm } from '@/hooks/useClearForm.ts';
import { setToken } from '@/utils/setToken.ts';

export function useForm<T extends AsyncThunk<ResponseUser, R, any>, R>(action: T) {
  const {
    form: { status, error: errorInfo },
  } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const onFinish = (data: R) => {
    dispatch(action(data)).then((e) => {
      const payload = e.payload as { user?: UserInfo };
      if (!payload.user) return;
      setToken(payload.user.token);
    });
  };
  useClearForm();
  return { errorInfo, errors: errorInfo.data || {}, onFinish, isLoading: status === 'loading' };
}
