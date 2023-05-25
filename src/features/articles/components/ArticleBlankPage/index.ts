import type { LazyRouteFunction, LoaderFunction, NonIndexRouteObject } from 'react-router-dom';

const lazyBlankArticle = (isAuth: boolean, author: null | string) => {
  const lazy: LazyRouteFunction<NonIndexRouteObject> = async () => {
    const { default: Component, action, loader } = await import('./ArticleBlankPage.tsx');
    const result = { Component, action, loader: undefined as undefined | LoaderFunction };
    if (isAuth) {
      result.loader = loader(author);
    }
    return result;
  };
  return lazy;
};
export default lazyBlankArticle;
