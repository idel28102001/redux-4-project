import type { LazyRouteFunction, NonIndexRouteObject } from 'react-router-dom';

const lazyArticle: LazyRouteFunction<NonIndexRouteObject> = async () => {
  const { default: Component, loader } = await import('./ArticlePage.tsx');
  return { Component, loader };
};
export default lazyArticle;
