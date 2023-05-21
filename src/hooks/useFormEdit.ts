import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks.ts';
import { selectAuth } from '@/store/reducers/auth';
import { useClearForm } from '@/hooks/useClearForm.ts';
import { putEditUserAction } from '@/store/reducers/auth/extraReducers.ts';

export function useFormEdit() {
  const {
    form: { status, error: errors },
  } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const onFinish = (data: HTMLFormElement) => {
    if (data['password'] && !data['password'].trim()) {
      delete data['password'];
    }
    dispatch(putEditUserAction(data as Record<string, string>));
  };
  useClearForm();
  console.log(errors);
  return { errors, onFinish, isLoading: status === 'loading' };
}
