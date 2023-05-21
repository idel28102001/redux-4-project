import { useEffect } from 'react';

export function useSetToken(token: string, isSuccess: boolean) {
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('token', token);
    }
  }, [isSuccess]);
}
