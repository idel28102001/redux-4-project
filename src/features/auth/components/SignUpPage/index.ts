import type { LazyRouteFunction, NonIndexRouteObject } from 'react-router-dom';

const lazySignUp: LazyRouteFunction<NonIndexRouteObject> = async () => {
  const { default: Component } = await import('./SignUpPage.tsx');
  return { Component };
};
export default lazySignUp;
