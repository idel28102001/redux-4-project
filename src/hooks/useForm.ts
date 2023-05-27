import { AsyncThunk, bindActionCreators, PayloadAction } from '@reduxjs/toolkit';
import { ResponseUser, UserInfo } from '@/features/auth/api/types.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks.ts';
import { selectAuth } from '@/store/reducers/auth';
import { useClearForm } from '@/hooks/useClearForm.ts';
import { setToken } from '@/utils/setToken.ts';
import { actionsMessage } from '@/store/reducers/message';

export function useForm<T extends AsyncThunk<ResponseUser, R, any>, R>(action: T) {
  const {
    form: { status, errors },
  } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const { setSuccess, setError } = bindActionCreators(actionsMessage, dispatch);
  const onFinish = (data: R) => {
    dispatch(action(data)).then((e) => {
      const curr = e as typeof e & { meta: { message: string } };
      switch (curr.meta.requestStatus) {
        case 'fulfilled': {
          const user = curr as PayloadAction<{ user: UserInfo }>;
          setSuccess(curr.meta.message);
          setToken(user.payload.user.token);
          break;
        }
        case 'rejected': {
          setError(curr.meta.message);
        }
      }
    });
  };
  useClearForm();
  return { errors, onFinish, isLoading: status === 'loading' };
}
