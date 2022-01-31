import { Tracker } from './Tracker';
import { Terminal } from './drivers/Terminal';
import { Product } from './entities/Product';
import { Collection } from './actions/Collection';
import { Cart } from './entities/Cart';
import { Promotion } from './entities/Promotion';
import { Checkout } from './actions/Checkout';
import { Refund } from './actions/Refund';

jest.mock('./drivers/Terminal');

describe('Tracking', () => {
  const d = new Terminal();
  const t = new Tracker(d);

  it('should be able to get a driver', () => {
    expect(t.getDriver()).toBeInstanceOf(Terminal);
  });

  it('should  return a new Product when product is called', () => {
    expect(t.product({ id: '1' })).toBeInstanceOf(Product);
  });

  it('should  return a new Collection when collection is called without params', () => {
    const c = t.collection();
    expect(c).toBeInstanceOf(Collection);
    expect(c.getList().length).toEqual(0);
  });

  it('should  return a new Collection when collection is called without params', () => {
    const c = t.collection([{ id: '1' }]);
    expect(c).toBeInstanceOf(Collection);
    expect(c.getList().length).toEqual(1);
  });

  it('should return a new Cart when cart is called', () => {
    expect(t.cart()).toBeInstanceOf(Cart);
  });

  it('should return a new Promotion when promotion is called', () => {
    expect(t.promotion({ id: 'Prom' })).toBeInstanceOf(Promotion);
  });

  it('should return a new Checkout when checkout is called', () => {
    expect(t.checkout()).toBeInstanceOf(Checkout);
  });

  it('should return a new Refund when refund is called', () => {
    expect(t.refund()).toBeInstanceOf(Refund);
  });

  it('should return d when getDriver is called', () => {
    expect(t.getDriver()).toEqual(d);
  });
});
