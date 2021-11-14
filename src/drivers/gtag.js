import chunk from '../helpers/chunk';

let gtag;

export const TYPE = 'gtag';

export default class Gtag {
  constructor(id) {
    if (id) {
      this.id = id;
      this.init();
    }
  }

  init() {
    const element = document.createElement('script');
    element.src = 'https://www.googletagmanager.com/gtag/js?id=UA-98212043-2';
    element.async = true;
    document.head.appendChild(element);
    window.dataLayer = window.dataLayer || [];
    gtag = function (...args) {
      window.dataLayer.push(args);
    };

    gtag('js', new Date());

    gtag('config', this.id);
  }

  // eslint-disable-next-line class-methods-use-this
  impression(items) {
    chunk(10, items).map((list) => gtag('event', 'view_item_list', { list }));
  }

  // eslint-disable-next-line class-methods-use-this
  clickItem(item) {
    gtag('event', 'select_content', {
      content_type: 'product',
      items: [
        item,
      ],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  viewItem(item) {
    gtag('event', 'view_item', {
      items: [
        item,
      ],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  addToCart(item) {
    gtag('event', 'add_to_cart', {
      content_type: 'product',
      items: [
        item,
      ],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  removeFromCart(item) {
    gtag('event', 'remove_from_cart', {
      content_type: 'product',
      items: [
        item,
      ],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  viewPromotion(promotion) {
    gtag('event', 'view_promotion', {
      promotions: [promotion],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  clickPromotion(promotion) {
    gtag('event', 'select_content', {
      promotions: [promotion],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  begin(items, coupon = null) {
    gtag('event', 'begin_checkout', {
      items,
      coupon,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  progress(items, step = null, coupon = null) {
    gtag('event', 'checkout_progress', {
      checkout_step: step,
      items,
      coupon,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  option(option, step, description = 'description') {
    gtag('event', 'set_checkout_option', {
      checkout_step: step,
      checkout_option: description,
      value: option,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  purchase(transactionId, affiliation, value, currency, tax, shipping, items) {
    gtag('event', 'purchase', {
      transaction_id: transactionId,
      affiliation,
      value,
      currency,
      tax,
      shipping,
      items,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  refund(transactionId, items = []) {
    gtag('event', 'refund', { transaction_id: transactionId, items });
  }
}
