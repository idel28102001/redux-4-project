import { useAppSelector } from '@/hooks/useStoreHooks.ts';
import { selectAuth } from '@/store/reducers/auth';

export function useIsAuthor(username: string) {
  const { user } = useAppSelector(selectAuth);
  return user ? user.username === username : false;
}