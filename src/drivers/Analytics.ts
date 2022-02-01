import chunk from '../helpers/chunk';
import { init, initEc } from './ga';
import {
  AnalyticsDriver, GaEvent, Impression, Promotion,
} from './Interface';

export class Analytics implements AnalyticsDriver {
  private readonly ga: any;

  constructor(id: string = null) {
    if (id) {
      this.ga = init(id);
    } else {
      this.ga = initEc();
    }
  }

  impression(items: Array<Impression>) {
    chunk<Impression>(10, items).forEach((list) => {
      list.map((item) => this.ga('ec:addImpression', item));
      this.ga('ec:setAction', 'detail');
      this.event({ eventAction: 'view_item_list' });
    });
  }

  clickItem(item: Impression) {
    this.ga('ec:addProduct', item);
    this.ga('ec:setAction', 'click', { list: item.list });
    this.event({
      eventAction: 'select_content', eventCategory: 'engagement', eventLabel: 'product',
    });
  }

  viewItem(item: Impression) {
    this.ga('ec:addProduct', item);
    this.ga('ec:setAction', 'detail');
    this.event({ eventAction: 'view_item' });
  }

  addToCart(item: Impression) {
    this.ga('ec:addProduct', item);
    this.ga('ec:setAction', 'add');
    this.event({ eventAction: 'add_to_cart', eventCategory: 'ecommerce' });
  }

  removeFromCart(item: Impression) {
    this.ga('ec:addProduct', item);
    this.ga('ec:setAction', 'remove');
    this.event({ eventAction: 'remove_from_cart', eventCategory: 'ecommerce' });
  }

  viewPromotion(promotion: Promotion) {
    this.ga('ec:addPromo', promotion);
    this.ga('ec:setAction', 'detail');
    this.event({ eventAction: 'view_promotion' });
  }

  clickPromotion(promotion: Promotion) {
    this.ga('ec:addPromo', promotion);
    this.ga('ec:setAction', 'promo_click');
    this.event({ eventAction: 'select_content' });
  }

  begin(items: Array<Impression>, coupon?: Promotion) {
    items.map((item) => this.ga('ec:addProduct', item));
    this.ga('ec:setAction', 'checkout', { step: 1, coupon });
    this.event({ eventAction: 'begin_checkout', eventCategory: 'ecommerce' });
  }

  progress(items: Array<Impression>, step: string, coupon?: Promotion) {
    items.map((item) => this.ga('ec:addProduct', item));
    this.ga('ec:setAction', 'checkout', { step, coupon });
    this.event({ eventAction: 'checkout_progress', eventCategory: 'ecommerce' });
  }

  option(option: string, step: string) {
    this.ga('ec:setAction', 'checkout_option', { step, option });
    this.event({ eventAction: 'set_checkout_option', eventCategory: 'ecommerce' });
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
    items.map((item) => this.ga('ec:addProduct', item));
    this.ga('set', 'currencyCode', currency);
    this.ga('ec:setAction', 'purchase', {
      id: transactionId,
      affiliation,
      revenue: value,
      tax,
      shipping,
    });
    this.event({ eventAction: 'purchase', eventCategory: 'ecommerce' });
  }

  refund(transactionId: string, items: Array<Impression> = []) {
    items.map((item) => this.ga('ec:addProduct', item));
    this.ga('ec:setAction', 'refund', { id: transactionId });
    this.event({ eventAction: 'refund', eventCategory: 'ecommerce' });
  }

  private event(
    {
      eventAction,
      eventCategory = 'engagement',
      eventLabel = null,
      nonInteractive = true,
      forceSSL = true,
    }: GaEvent,
  ) {
    this.ga('send', 'event', {
      eventAction, eventCategory, nonInteractive, forceSSL, eventLabel,
    });
  }
}
