import { AsyncThunk, bindActionCreators } from '@reduxjs/toolkit';
import { ResponseUser } from '@/features/auth/api/types.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks.ts';
import { selectAuth } from '@/store/reducers/auth';
import { useClearForm } from '@/hooks/useClearForm.ts';
import { actionsMessage } from '@/store/reducers/message';
import { actionThen } from '@/store/reducers/actionHelpers.ts';
import { setToken } from '@/utils/setToken.ts';

export function useForm<T extends AsyncThunk<ResponseUser, R, any>, R>(action: T) {
  const {
    form: { status, errors },
  } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const { setSuccess, setError } = bindActionCreators(actionsMessage, dispatch);
  const onFinish = (data: R) => {
    const promise = dispatch(action(data));
    promise.then(
      actionThen({
        res: (message, arg) => {
          setToken(arg.user.token);
          setSuccess(message);
        },
        rej: (message) => {
          setError(message);
        },
      })
    );
  };
  useClearForm();
  return { errors, onFinish, isLoading: status === 'loading' };
}
