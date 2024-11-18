type T = (path: string) => undefined | string;

export const id: T = path => {
  const match = path.match(/^\/(?:hotels|countries|cities)\/([a-z0-9]+)\/?$/);

  return (match === null) ? undefined : match[1];
};
