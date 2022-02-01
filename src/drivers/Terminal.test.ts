import { Terminal } from './Terminal';
import { Impression, Promotion } from './Interface';

jest.spyOn(global.console, 'info');

describe('Terminal', () => {
  const t = new Terminal();
  const i:Impression = { id: '1' };
  const c:Promotion = { id: 'promo', creative: 'A promotion' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should addToCard', () => {
    t.addToCart(i);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith('Shel', [i]);
  });

  it('should removeFromCart', () => {
    t.removeFromCart(i);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith('Shel', [i]);
  });

  it('should viewItem', () => {
    t.viewItem(i);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith('Shel', [i]);
  });

  it('should begin with coupon', () => {
    t.begin([i], c);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith('Shel', [[i], c]);
  });

  it('should begin without coupon', () => {
    t.begin([i]);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith('Shel', [[i], undefined]);
  });

  it('should clickItem', () => {
    t.clickItem(i);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith('Shel', [i]);
  });

  it('should clickPromotion', () => {
    t.clickPromotion(c);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith('Shel', [c]);
  });

  it('should viewPromotion', () => {
    t.viewPromotion(c);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith('Shel', [c]);
  });

  it('should perform impression', () => {
    t.impression([i]);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith('Shel', [[i]]);
  });

  it('should call option', () => {
    t.option('test', 'step');
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith('Shel', ['test', 'step']);
  });

  it('should call progress without promo', () => {
    t.progress([i], 'step');
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith('Shel', [[i], 'step', undefined]);
  });

  it('should call progress with promo', () => {
    t.progress([i], 'step', c);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith('Shel', [[i], 'step', c]);
  });

  it('should call purchase', () => {
    t.purchase('1', 'test', 10, 'GBP', 23, 'online', [i]);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith('Shel', ['1', 'test', 10, 'GBP', 23, 'online', [i]]);
  });

  it('should refund', () => {
    t.refund('1', [i]);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith('Shel', ['1', [i]]);
  });
});
