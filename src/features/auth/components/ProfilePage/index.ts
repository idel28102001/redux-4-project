import type { LazyRouteFunction, NonIndexRouteObject } from 'react-router-dom';

const lazyProfile: LazyRouteFunction<NonIndexRouteObject> = async () => {
  const { default: Component } = await import('./ProfilePage.tsx');
  return { Component };
};
export default lazyProfile;
