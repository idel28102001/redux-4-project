const lazyMainLayout = async () => {
  const { default: Component } = await import('./MainLayout.tsx');
  return { Component: Component };
};
export default lazyMainLayout;
