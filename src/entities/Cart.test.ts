import { Cart } from './Cart';
import { Terminal } from '../drivers/Terminal';
import { Product } from './Product';
import { Impression } from '../drivers/Interface';

jest.mock('../drivers/Terminal');

describe('Cart', () => {
  const i: Impression = { id: '1' };
  const i2: Impression = { id: '2', quantity: 2 };
  const t = new Terminal();
  const c = new Cart(t);
  const p = new Product(i, t);
  it('can be initiated with no products', () => {
    expect(c).toBeInstanceOf(Cart);
    expect(c.getItems().length).toEqual(0);
    expect(c.countItems()).toEqual(0);
  });

  it('should be able to add a Product', () => {
    c.add(p);
    expect(t.addToCart).toHaveBeenCalledWith(p);
    expect(c.getItems().length).toEqual(1);
    expect(c.countItems()).toEqual(1);
  });

  it('should be able to add a Product with more than 1 quantity', () => {
    c.add(new Product(i2));
    expect(c.getItems().length).toEqual(2);
    expect(c.countItems()).toEqual(3);
  });

  it('should be able to remove a Product', () => {
    c.remove(p);
    expect(c.getItems().length).toEqual(1);
    expect(c.countItems()).toEqual(2);
    expect(t.removeFromCart).toHaveBeenCalledWith(p);
  });
});
