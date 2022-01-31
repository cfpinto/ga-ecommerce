import { Product } from './Product';
import { Impression } from '../drivers/Interface';
import { Terminal } from '../drivers/Terminal';

jest.mock('../drivers/Terminal');

describe('Product', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be instantiable with just an id on impression object ', () => {
    const i: Impression = { id: 'ANID' };
    const p = new Product(i, new Terminal());

    expect(p.id).toEqual('ANID');
    expect(p.coupon).toBe(undefined);
    expect(p.getJson()).toEqual({ id: 'ANID' });
  });

  it.each([
    ['name', 'A name'],
    ['list', 'A list'],
    ['brand', 'A brand'],
    ['variant', 'Variant B'],
    ['category', 'A category'],
    ['position', 1],
    ['price', 10],
    ['quantity', 1],
    ['coupon', '10% Discount'],
  ])('should be able to get impression after changing %s', (key: keyof Impression, value: any) => {
    const i: Impression = { id: 'ANID' };
    const p = new Product(i, new Terminal());
    expect(p.id).toBe('ANID');
    expect(p.getJson()).toEqual({ id: 'ANID' });
    (p[key] as any) = value;
    expect(p[key]).toEqual(value);
    expect(p.getJson()).toEqual({ id: 'ANID', [key]: value });
  });

  it('should trigger a click event when click is called', () => {
    const i: Impression = { id: 'ANID' };
    const t: Terminal = new Terminal();
    const p = new Product(i, t);

    p.click();

    expect(t.clickItem).toHaveBeenCalledWith(p);
  });

  it('should trigger an impression event when impression is called', () => {
    const i: Impression = { id: 'ANID' };
    const t: Terminal = new Terminal();
    const p = new Product(i, t);

    p.impression();

    expect(t.viewItem).toHaveBeenCalledWith(p);
  });

  it('should allow getters and setters', () => {
    const prod = new Product({ id: '1' });
    prod.id = '2';
    expect(prod.id).toEqual('2');
    expect(prod.quantity).toEqual(1);
  });
});
