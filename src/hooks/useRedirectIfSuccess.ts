import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function useRedirectIfSuccess(isSuccess: boolean) {
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess]);
}