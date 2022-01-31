import { Storage } from './Storage';

describe('Storage', () => {
  const s = new Storage();
  const store = { first: 1, second: 2 };
  it('can be instantiated', () => {
    expect(s).toBeInstanceOf(Storage);
  });

  it('should write and read from storage', () => {
    s.write(store);
    expect(s.read()).toEqual(store);
  });

  it('should update a key', () => {
    s.write(store);
    s.setKey('second', 3);
    expect(s.read()).toEqual({ ...store, second: 3 });
  });

  it('should retrieve a key', () => {
    expect(s.getKey('second')).toEqual(3);
  });
});
