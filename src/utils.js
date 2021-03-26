export const truncate = (string, length) => {
  if (string.length <= length) {
    return string;
  }
  return `${string.slice(0, length)}...`;
};

export const inflect = (singular, plural = `${singular}s`) => (quantity) =>
  Math.abs(quantity) === 1 ? singular : plural;
