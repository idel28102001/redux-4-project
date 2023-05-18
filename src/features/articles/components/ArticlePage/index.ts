export default async function lazyArticle() {
  const { default: Component, loader } = await import('./ArticlePage.tsx');
  return { Component, loader };
}
