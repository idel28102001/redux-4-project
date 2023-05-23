import type { LazyRouteFunction, NonIndexRouteObject } from 'react-router-dom';

const lazyCreateArticle: LazyRouteFunction<NonIndexRouteObject> = async () => {
  const { default: Component } = await import('./CreateArticlePage.tsx');
  return { Component };
};
export default lazyCreateArticle;
