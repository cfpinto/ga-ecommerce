import { init, initEc } from './ga';
import { Analytics } from './Analytics';
import { Impression, Promotion } from './Interface';

const mockGa = jest.fn();
jest.mock('./ga', () => ({
  init: jest.fn().mockImplementation(() => mockGa),
  initEc: jest.fn().mockImplementation(() => mockGa),
}));

describe('Analytics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create a new instance when id is provided', () => {
      const id = 'a-google-id';
      const a = new Analytics(id);

      expect(a).toBeInstanceOf(Analytics);
      expect(init).toHaveBeenCalledTimes(1);
      expect(initEc).toHaveBeenCalledTimes(0);
    });

    it('should create a new instance when id is not provided', () => {
      const a = new Analytics();

      expect(a).toBeInstanceOf(Analytics);
      expect(init).toHaveBeenCalledTimes(0);
      expect(initEc).toHaveBeenCalledTimes(1);
    });
  });

  describe('methods', () => {
    const id = 'a-google-id';
    const imp1: Impression = { id: '1' };
    const imp2: Impression = { id: '2' };
    const imp3: Impression = { id: '3' };
    const promo: Promotion = { id: '1', creative: 'a promotion' };
    let analytics: Analytics;

    beforeEach(() => {
      analytics = new Analytics(id);
    });

    it('should perform impressions', () => {
      const impressions: Array<Impression> = Array.from(Array(20)).map((x, i) => ({
        id: i.toString(),
      }));
      analytics.impression(impressions);

      expect(mockGa).toHaveBeenCalledTimes(24);
      expect(mockGa).toHaveBeenNthCalledWith(1, 'ec:addImpression', impressions[0]);
      expect(mockGa).toHaveBeenNthCalledWith(11, 'ec:setAction', 'detail');
      expect(mockGa).toHaveBeenNthCalledWith(12, 'send', 'event', {
        eventAction: 'view_item_list',
        eventCategory: 'engagement',
        eventLabel: null,
        forceSSL: true,
        nonInteractive: true,
      });
    });

    it('should perform clickItem', () => {
      analytics.clickItem(imp1);

      expect(mockGa).toHaveBeenCalledTimes(3);
      expect(mockGa).toHaveBeenNthCalledWith(1, 'ec:addProduct', imp1);
      expect(mockGa).toHaveBeenNthCalledWith(2, 'ec:setAction', 'click', { list: imp1.list });
      expect(mockGa).toHaveBeenNthCalledWith(3, 'send', 'event', {
        eventAction: 'select_content',
        eventCategory: 'engagement',
        eventLabel: 'product',
        forceSSL: true,
        nonInteractive: true,
      });
    });

    it('should perform viewItem', () => {
      analytics.viewItem(imp1);

      expect(mockGa).toHaveBeenCalledTimes(3);
      expect(mockGa).toHaveBeenNthCalledWith(1, 'ec:addProduct', imp1);
      expect(mockGa).toHaveBeenNthCalledWith(2, 'ec:setAction', 'detail');
      expect(mockGa).toHaveBeenNthCalledWith(3, 'send', 'event', {
        eventAction: 'view_item',
        eventCategory: 'engagement',
        eventLabel: null,
        forceSSL: true,
        nonInteractive: true,
      });
    });

    it('should perform addToCart', () => {
      analytics.addToCart(imp1);

      expect(mockGa).toHaveBeenCalledTimes(3);
      expect(mockGa).toHaveBeenNthCalledWith(1, 'ec:addProduct', imp1);
      expect(mockGa).toHaveBeenNthCalledWith(2, 'ec:setAction', 'add');
      expect(mockGa).toHaveBeenNthCalledWith(3, 'send', 'event', {
        eventAction: 'add_to_cart',
        eventCategory: 'ecommerce',
        eventLabel: null,
        forceSSL: true,
        nonInteractive: true,
      });
    });

    it('should perform removeFromCart', () => {
      analytics.removeFromCart(imp1);

      expect(mockGa).toHaveBeenCalledTimes(3);
      expect(mockGa).toHaveBeenNthCalledWith(1, 'ec:addProduct', imp1);
      expect(mockGa).toHaveBeenNthCalledWith(2, 'ec:setAction', 'remove');
      expect(mockGa).toHaveBeenNthCalledWith(3, 'send', 'event', {
        eventAction: 'remove_from_cart',
        eventCategory: 'ecommerce',
        eventLabel: null,
        forceSSL: true,
        nonInteractive: true,
      });
    });

    it('should perform viewPromotion', () => {
      analytics.viewPromotion(promo);

      expect(mockGa).toHaveBeenCalledTimes(3);
      expect(mockGa).toHaveBeenNthCalledWith(1, 'ec:addPromo', promo);
      expect(mockGa).toHaveBeenNthCalledWith(2, 'ec:setAction', 'detail');
      expect(mockGa).toHaveBeenNthCalledWith(3, 'send', 'event', {
        eventAction: 'view_promotion',
        eventCategory: 'engagement',
        eventLabel: null,
        forceSSL: true,
        nonInteractive: true,
      });
    });

    it('should perform clickPromotion', () => {
      analytics.clickPromotion(promo);

      expect(mockGa).toHaveBeenCalledTimes(3);
      expect(mockGa).toHaveBeenNthCalledWith(1, 'ec:addPromo', promo);
      expect(mockGa).toHaveBeenNthCalledWith(2, 'ec:setAction', 'promo_click');
      expect(mockGa).toHaveBeenNthCalledWith(3, 'send', 'event', {
        eventAction: 'select_content',
        eventCategory: 'engagement',
        eventLabel: null,
        forceSSL: true,
        nonInteractive: true,
      });
    });

    it('should perform begin without promo', () => {
      const list = [imp1, imp2, imp3];
      analytics.begin(list);

      expect(mockGa).toHaveBeenCalledTimes(5);
      list.forEach((item, index) => expect(mockGa).toHaveBeenNthCalledWith(index + 1, 'ec:addProduct', item));
      expect(mockGa).toHaveBeenNthCalledWith(4, 'ec:setAction', 'checkout', { step: 1, coupon: undefined });
      expect(mockGa).toHaveBeenNthCalledWith(5, 'send', 'event', {
        eventAction: 'begin_checkout',
        eventCategory: 'ecommerce',
        eventLabel: null,
        forceSSL: true,
        nonInteractive: true,
      });
    });

    it('should perform begin with promo', () => {
      const list = [imp1, imp2, imp3];
      analytics.begin(list, promo);

      expect(mockGa).toHaveBeenCalledTimes(5);
      list.forEach((item, index) => expect(mockGa).toHaveBeenNthCalledWith(index + 1, 'ec:addProduct', item));
      expect(mockGa).toHaveBeenNthCalledWith(4, 'ec:setAction', 'checkout', { step: 1, coupon: promo });
      expect(mockGa).toHaveBeenNthCalledWith(5, 'send', 'event', {
        eventAction: 'begin_checkout',
        eventCategory: 'ecommerce',
        eventLabel: null,
        forceSSL: true,
        nonInteractive: true,
      });
    });

    it('should progress without coupon', () => {
      const items = [imp1];
      analytics.progress(items, 'step1');

      expect(mockGa).toHaveBeenCalledTimes(3);
      expect(mockGa).toHaveBeenNthCalledWith(1, 'ec:addProduct', items[0]);
      expect(mockGa).toHaveBeenNthCalledWith(2, 'ec:setAction', 'checkout', { step: 'step1', coupon: undefined });
      expect(mockGa).toHaveBeenNthCalledWith(3, 'send', 'event', {
        eventAction: 'checkout_progress',
        eventCategory: 'ecommerce',
        eventLabel: null,
        forceSSL: true,
        nonInteractive: true,
      });
    });

    it('should progress with coupon', () => {
      const items = [imp1];
      analytics.progress(items, 'step1', promo);

      expect(mockGa).toHaveBeenCalledTimes(3);
      expect(mockGa).toHaveBeenNthCalledWith(1, 'ec:addProduct', items[0]);
      expect(mockGa).toHaveBeenNthCalledWith(2, 'ec:setAction', 'checkout', { step: 'step1', coupon: promo });
      expect(mockGa).toHaveBeenNthCalledWith(3, 'send', 'event', {
        eventAction: 'checkout_progress',
        eventCategory: 'ecommerce',
        eventLabel: null,
        forceSSL: true,
        nonInteractive: true,
      });
    });

    it('should progress option', () => {
      analytics.option('value', 'step1');

      expect(mockGa).toHaveBeenCalledTimes(2);
      expect(mockGa).toHaveBeenNthCalledWith(1, 'ec:setAction', 'checkout_option', { step: 'step1', option: 'value' });
      expect(mockGa).toHaveBeenNthCalledWith(2, 'send', 'event', {
        eventAction: 'set_checkout_option',
        eventCategory: 'ecommerce',
        eventLabel: null,
        forceSSL: true,
        nonInteractive: true,
      });
    });

    it('should purchase', () => {
      analytics.purchase('1', 'none', 10, 'GBP', 23, 'online', [imp1]);

      expect(mockGa).toHaveBeenCalledTimes(4);
      expect(mockGa).toHaveBeenNthCalledWith(1, 'ec:addProduct', imp1);
      expect(mockGa).toHaveBeenNthCalledWith(2, 'set', 'currencyCode', 'GBP');
      expect(mockGa).toHaveBeenNthCalledWith(3, 'ec:setAction', 'purchase', {
        id: '1',
        affiliation: 'none',
        revenue: 10,
        tax: 23,
        shipping: 'online',
      });
      expect(mockGa).toHaveBeenNthCalledWith(4, 'send', 'event', {
        eventAction: 'purchase',
        eventCategory: 'ecommerce',
        eventLabel: null,
        forceSSL: true,
        nonInteractive: true,
      });
    });

    it('should refund with items', () => {
      analytics.refund('ref1', [imp3]);

      expect(mockGa).toHaveBeenCalledTimes(3);
      expect(mockGa).toHaveBeenNthCalledWith(1, 'ec:addProduct', imp3);
      expect(mockGa).toHaveBeenNthCalledWith(2, 'ec:setAction', 'refund', { id: 'ref1' });
      expect(mockGa).toHaveBeenNthCalledWith(3, 'send', 'event', {
        eventAction: 'refund',
        eventCategory: 'ecommerce',
        eventLabel: null,
        forceSSL: true,
        nonInteractive: true,
      });
    });

    it('should refund without items', () => {
      analytics.refund('ref1');

      expect(mockGa).toHaveBeenCalledTimes(2);
      expect(mockGa).toHaveBeenNthCalledWith(1, 'ec:setAction', 'refund', { id: 'ref1' });
      expect(mockGa).toHaveBeenNthCalledWith(2, 'send', 'event', {
        eventAction: 'refund',
        eventCategory: 'ecommerce',
        eventLabel: null,
        forceSSL: true,
        nonInteractive: true,
      });
    });
  });
});
