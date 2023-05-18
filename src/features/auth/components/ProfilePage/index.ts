export default async function lazyProfile() {
  const { default: Component } = await import('./ProfilePage.tsx');
  return { Component };
}
