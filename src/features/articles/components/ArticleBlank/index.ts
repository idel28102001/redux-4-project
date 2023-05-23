import type { LazyRouteFunction, NonIndexRouteObject } from 'react-router-dom';

const lazyCreateArticle: LazyRouteFunction<NonIndexRouteObject> = async () => {
  const { ArticleBlank: Component } = await import('./ArticleBlank.tsx');
  return { Component: ArticleBlank };
};
export default lazyCreateArticle;
