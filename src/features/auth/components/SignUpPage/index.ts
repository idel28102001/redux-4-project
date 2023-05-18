export default async function lazySignUp() {
  const { action, default: Component } = await import('./SignUpPage.tsx');
  return { action, Component };
}
