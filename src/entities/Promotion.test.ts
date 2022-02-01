import { Promotion } from './Promotion';
import { Promotion as Promo } from '../drivers/Interface';
import { Terminal } from '../drivers/Terminal';

jest.mock('../drivers/Terminal');

describe('Product', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be instantiable with just an id on Promo object ', () => {
    const i: Promo = { id: 'ANID' };
    const p = new Promotion(i, new Terminal());

    expect(p.id).toEqual('ANID');
    expect(p.creative).toBe(undefined);
    expect(p.getJson()).toEqual({ id: 'ANID' });
  });

  it.each([
    ['name', 'DISCOUNT'],
    ['creative', 'http://localhost'],
    ['position', 1],
  ])('should be able to get impression after changing %s', (key: keyof Promo, value: any) => {
    const i: Promo = { id: 'ANID' };
    const p = new Promotion(i, new Terminal());
    expect(p.id).toBe('ANID');
    expect(p.getJson()).toEqual({ id: 'ANID' });
    (p[key] as any) = value;
    expect(p[key]).toEqual(value);
    expect(p.getJson()).toEqual({ id: 'ANID', [key]: value });
  });

  it('should trigger a click event when click is called', () => {
    const i: Promo = { id: 'ANID' };
    const t: Terminal = new Terminal();
    const p = new Promotion(i, t);

    p.click();

    expect(t.clickPromotion).toHaveBeenCalledWith(p);
  });

  it('should trigger an impression event when impression is called', () => {
    const i: Promo = { id: 'ANID' };
    const t: Terminal = new Terminal();
    const p = new Promotion(i, t);

    p.impression();

    expect(t.viewPromotion).toHaveBeenCalledWith(p);
  });

  it('should allow getters and setters', () => {
    const i: Promo = { id: 'ANID' };
    const p = new Promotion(i);

    expect(p.id).toEqual('ANID');

    p.id = 'ANOTHERID';

    expect(p.id).toEqual('ANOTHERID');
  });
});
