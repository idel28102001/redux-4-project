import { UserInfo } from '@/features/auth/api/types.ts';
import { getUser } from '@/features/auth/api/getUser.ts';

export async function loadUser(): Promise<UserInfo | null> {
  const token = localStorage.getItem('token') || '';
  if (!token) return null;
  const {
    data: { user: newUser },
  } = await getUser();
  return newUser;
}