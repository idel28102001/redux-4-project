import { useAppDispatch, useAppSelector } from '@/hooks/useStoreHooks.ts';
import { selectAuth } from '@/store/reducers/auth';
import { useEffect } from 'react';
import { getUserAction } from '@/store/reducers/auth/extraReducers.ts';

export function useAuthorization() {
  const token = localStorage.getItem('token') || '';
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user && token) {
      dispatch(getUserAction());
    }
  }, []);
}