export const arrayToJSON = (array?: string | Array<string>) =>
  array ? (array.length > 1 ? JSON.stringify(array) : JSON.stringify([array])) : '[]';
