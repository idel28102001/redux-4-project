import type { LazyRouteFunction, NonIndexRouteObject } from 'react-router-dom';

const lazyMessageMainLayout: LazyRouteFunction<NonIndexRouteObject> = async () => {
  const { default: Component } = await import('./MessageMainLayout.tsx');
  return { Component };
};
export default lazyMessageMainLayout;
