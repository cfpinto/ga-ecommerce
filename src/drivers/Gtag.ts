import chunk from '../helpers/chunk';
import { init } from './gta';
import { AnalyticsDriver, Impression, Promotion } from './Interface';

export class Gtag implements AnalyticsDriver {
  private gtag: any;

  private id: string;

  constructor(id: string = null) {
    if (id) {
      this.id = id;
      this.gtag = init();
      return;
    }

    // @ts-ignore
    this.gtag = window.gtag;
  }

  impression(items: Array<Impression>) {
    chunk(10, items).map((list) => this.gtag('event', 'view_item_list', { list }));
  }

  clickItem(item: Impression) {
    this.gtag('event', 'select_content', {
      content_type: 'product',
      items: [
        item,
      ],
    });
  }

  viewItem(item: Impression) {
    this.gtag('event', 'view_item', {
      items: [
        item,
      ],
    });
  }

  addToCart(item: Impression) {
    this.gtag('event', 'add_to_cart', {
      content_type: 'product',
      items: [
        item,
      ],
    });
  }

  removeFromCart(item: Impression) {
    this.gtag('event', 'remove_from_cart', {
      content_type: 'product',
      items: [
        item,
      ],
    });
  }

  viewPromotion(promotion: Promotion) {
    this.gtag('event', 'view_promotion', {
      promotions: [promotion],
    });
  }

  clickPromotion(promotion: Promotion) {
    this.gtag('event', 'select_content', {
      promotions: [promotion],
    });
  }

  begin(items: Array<Impression>, coupon?: Promotion) {
    this.gtag('event', 'begin_checkout', {
      items,
      coupon,
    });
  }

  progress(items: Array<Impression>, step: string, coupon?: Promotion) {
    this.gtag('event', 'checkout_progress', {
      checkout_step: step,
      items,
      coupon,
    });
  }

  option(option: string, step: string, description: string = 'description') {
    this.gtag('event', 'set_checkout_option', {
      checkout_step: step,
      checkout_option: description,
      value: option,
    });
  }

  purchase(
    transactionId: string,
    affiliation: string,
    value: number,
    currency: string,
    tax: number,
    shipping: string,
    items: Array<Impression>,
  ) {
    this.gtag('event', 'purchase', {
      transaction_id: transactionId,
      affiliation,
      value,
      currency,
      tax,
      shipping,
      items,
    });
  }

  refund(transactionId: string, items: Array<Impression> = []) {
    this.gtag('event', 'refund', { transaction_id: transactionId, items });
  }
}
