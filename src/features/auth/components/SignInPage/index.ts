export default async function lazySignIn() {
  const { default: Component } = await import('./SignInPage.tsx');
  return { Component };
}
