import chunk from './chunk';

describe('chunk', () => {
  const array = [1, 2, 3, 4, 5, 6];
  const parts = chunk<number>(3, array);
  it('should return an array containing chunked arrays', () => {
    expect(parts.length).toBe(2);
  });

  it('should have 2 arrays with 3 entries in the chunked', () => {
    expect(parts.length).toBe(2);
    expect(parts[0].length).toBe(3);
    expect(parts[1].length).toBe(3);
  });
});
