import lazySignIn from '@/features/auth/components/SignInPage';
import lazySignUp from '@/features/auth/components/SignUpPage';

export const publicRoutes = (isAuth: boolean) => {
  if (isAuth) return { auth: [] };
  return {
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