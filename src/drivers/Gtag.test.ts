import { init } from './gta';
import { Gtag } from './Gtag';
import { Impression, Promotion } from './Interface';

const mockGtag = jest.fn();
jest.mock('./gta', () => ({
  init: jest.fn().mockImplementation(() => mockGtag),
}));

describe('Gtag', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create a new instance when id is provided', () => {
      const id = 'a-google-id';
      const a = new Gtag(id);

      expect(a).toBeInstanceOf(Gtag);
      expect(init).toHaveBeenCalledTimes(1);
    });

    it('should create a new instance when id is not provided', () => {
      const a = new Gtag();

      expect(a).toBeInstanceOf(Gtag);
      expect(init).toHaveBeenCalledTimes(0);
    });
  });

  describe('methods', () => {
    const id = 'a-google-id';
    const imp1: Impression = { id: '1' };
    const imp2: Impression = { id: '2' };
    const imp3: Impression = { id: '3' };
    const promo: Promotion = { id: '1', creative: 'a promotion' };
    let gtags: Gtag;

    beforeEach(() => {
      gtags = new Gtag(id);
    });

    it('should perform impressions', () => {
      const impressions: Array<Impression> = Array.from(Array(20)).map((x, i) => ({
        id: i.toString(),
      }));
      gtags.impression(impressions);

      expect(mockGtag).toHaveBeenCalledTimes(2);
      expect(mockGtag).toHaveBeenNthCalledWith(
        1,
        'event',
        'view_item_list',
        { list: Array.from(Array(10)).map((_, i) => impressions[i]) },
      );
      expect(mockGtag).toHaveBeenNthCalledWith(
        2,
        'event',
        'view_item_list',
        { list: Array.from(Array(10)).map((_, i) => impressions[i + 10]) },
      );
    });

    it('should perform clickItem', () => {
      gtags.clickItem(imp1);

      expect(mockGtag).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenNthCalledWith(1, 'event', 'select_content', {
        content_type: 'product',
        items: [imp1],
      });
    });

    it('should perform viewItem', () => {
      gtags.viewItem(imp1);

      expect(mockGtag).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenNthCalledWith(1, 'event', 'view_item', {
        items: [imp1],
      });
    });

    it('should perform addToCart', () => {
      gtags.addToCart(imp1);

      expect(mockGtag).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenNthCalledWith(1, 'event', 'add_to_cart', {
        content_type: 'product',
        items: [imp1],
      });
    });

    it('should perform removeFromCart', () => {
      gtags.removeFromCart(imp1);

      expect(mockGtag).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenNthCalledWith(1, 'event', 'remove_from_cart', {
        content_type: 'product',
        items: [imp1],
      });
    });

    it('should perform viewPromotion', () => {
      gtags.viewPromotion(promo);

      expect(mockGtag).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenNthCalledWith(1, 'event', 'view_promotion', {
        promotions: [promo],
      });
    });

    it('should perform clickPromotion', () => {
      gtags.clickPromotion(promo);

      expect(mockGtag).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenNthCalledWith(1, 'event', 'select_content', {
        promotions: [promo],
      });
    });

    it('should perform begin without promo', () => {
      const list = [imp1, imp2, imp3];
      gtags.begin(list);

      expect(mockGtag).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenNthCalledWith(1, 'event', 'begin_checkout', {
        coupon: undefined,
        items: list,
      });
    });

    it('should perform begin with promo', () => {
      const list = [imp1, imp2, imp3];
      gtags.begin(list, promo);

      expect(mockGtag).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenNthCalledWith(1, 'event', 'begin_checkout', {
        coupon: promo,
        items: list,
      });
    });

    it('should progress without coupon', () => {
      const items = [imp1];
      gtags.progress(items, 'step1');

      expect(mockGtag).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenNthCalledWith(1, 'event', 'checkout_progress', {
        checkout_step: 'step1',
        coupon: undefined,
        items,
      });
    });

    it('should progress with coupon', () => {
      const items = [imp1];
      gtags.progress(items, 'step1', promo);

      expect(mockGtag).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenNthCalledWith(1, 'event', 'checkout_progress', {
        checkout_step: 'step1',
        coupon: promo,
        items,
      });
    });

    it('should progress option without description', () => {
      gtags.option('value', 'step1');

      expect(mockGtag).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenNthCalledWith(1, 'event', 'set_checkout_option', {
        checkout_step: 'step1',
        value: 'value',
        checkout_option: 'description',
      });
    });

    it('should progress option with description', () => {
      gtags.option('value', 'step1', 'desc');

      expect(mockGtag).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenNthCalledWith(1, 'event', 'set_checkout_option', {
        checkout_step: 'step1',
        value: 'value',
        checkout_option: 'desc',
      });
    });

    it('should purchase', () => {
      gtags.purchase('1', 'none', 10, 'GBP', 23, 'online', [imp1]);

      expect(mockGtag).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenNthCalledWith(1, 'event', 'purchase', {
        transaction_id: '1',
        affiliation: 'none',
        value: 10,
        currency: 'GBP',
        tax: 23,
        shipping: 'online',
        items: [imp1],
      });
    });

    it('should refund with items', () => {
      gtags.refund('ref1', [imp3]);

      expect(mockGtag).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenNthCalledWith(1, 'event', 'refund', {
        transaction_id: 'ref1',
        items: [imp3],
      });
    });

    it('should refund without items', () => {
      gtags.refund('ref1');

      expect(mockGtag).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenNthCalledWith(1, 'event', 'refund', {
        transaction_id: 'ref1',
        items: [],
      });
    });
  });
});
