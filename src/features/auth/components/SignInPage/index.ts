import type { LazyRouteFunction, NonIndexRouteObject } from 'react-router-dom';

const lazySignIn: LazyRouteFunction<NonIndexRouteObject> = async () => {
  const { default: Component } = await import('./SignInPage.tsx');
  return { Component };
};
export default lazySignIn;
