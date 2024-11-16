type T = (searchTerm: string) => string;

export const regexPattern: T = searchTerm => {
  return `.*${searchTerm.replace(/[^a-z0-9]/gi, '').split('').join('.*')}.*`;
};
