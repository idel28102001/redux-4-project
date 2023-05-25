import lazySignIn from '@/features/auth/components/SignInPage';
import lazySignUp from '@/features/auth/components/SignUpPage';
import { Navigate } from 'react-router-dom';

export const publicRoutes = (isAuth: boolean) => {
  if (isAuth) return { auth: [], articles: [] };
  return {
    articles: [{ path: '*', element: <Navigate to={'/sign-in'} /> }],
    auth: [
      {
        path: 'sign-in',
        lazy: lazySignIn,
      },

      {
        path: 'sign-up',
        lazy: lazySignUp,
      },
    ],
  };
};
