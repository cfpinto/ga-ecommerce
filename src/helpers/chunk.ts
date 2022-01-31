const chunk = <T>(size: number, xs: Array<T>): Array<Array<T>> => xs.reduce(
  (segments, _, index) => (index % size === 0
    ? [...segments, xs.slice(index, index + size)]
    : segments),
  [],
);

export default chunk;
