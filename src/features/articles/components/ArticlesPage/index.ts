export default async function lazy() {
  const { loader, default: Component } = await import('./ArticlesPage.tsx');
  return { loader, Component };
}
