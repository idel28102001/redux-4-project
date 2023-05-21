import { AsyncThunk } from '@reduxjs/toolkit';
import { ResponseUser } from '@/features/auth/api/types.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks.ts';
import { selectAuth } from '@/store/reducers/auth';
import { useRedirectIfSuccess } from '@/hooks/useRedirectIfSuccess.ts';
import { useClearForm } from '@/hooks/useClearForm.ts';
import { useSetToken } from '@/hooks/useSetToken.ts';

export function useForm<T extends AsyncThunk<ResponseUser, R, any>, R>(action: T) {
  const {
    form: { status, error: errors },
    user,
  } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const onFinish = (data: R) => {
    dispatch(action(data));
  };
  const isSuccess = status === 'succeeded';
  useRedirectIfSuccess(isSuccess);
  useSetToken(user?.token || '', isSuccess);
  useClearForm();
  return { errors, onFinish, isLoading: status === 'loading' };
}
