export const percentOf = (total: number, part: number) => {
  // total - 100
  // part  - x

  // total * x = part * 100
  // x = (part * 100) / total

  return (part * 100) / total;
};

export const percent = (n: number) => (of: number) => {
  return of * (n / 100);
};
