import lazyCreateArticle from '@/features/articles/components/CreateArticlePage';
import lazyProfile from '@/features/auth/components/ProfilePage';

export const privateRoutes = (isAuth: boolean) => {
  if (!isAuth) return { auth: [], articles: [] };
  return {
    articles: [{ path: 'new-article', lazy: lazyCreateArticle }],
    auth: [
      {
        path: 'profile',
        lazy: lazyProfile,
      },
    ],
  };
};