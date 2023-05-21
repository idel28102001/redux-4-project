import type { LazyRouteFunction, NonIndexRouteObject } from 'react-router-dom';

const lazyArticles: LazyRouteFunction<NonIndexRouteObject> = async () => {
  const { default: Component } = await import('./ArticlesPage.tsx');
  return { Component };
};
export default lazyArticles;
