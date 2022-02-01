import 'pretty-console-colors';
import { AnalyticsDriver, Impression, Promotion } from './Interface';

export class Terminal implements AnalyticsDriver {
  private name: string = 'Shel';

  addToCart(item: Impression): void {
    this.log(item);
  }

  begin(items: Array<Impression>, coupon?: Promotion): void {
    this.log(items, coupon);
  }

  clickItem(item: Impression): void {
    this.log(item);
  }

  clickPromotion(promotion: Promotion): void {
    this.log(promotion);
  }

  impression(items: Array<Impression>): void {
    this.log(items);
  }

  option(option: string, step: string): void {
    this.log(option, step);
  }

  progress(items: Array<Impression>, step: string, coupon?: Promotion): void {
    this.log(items, step, coupon);
  }

  purchase(
    transactionId: string,
    affiliation: string,
    value: number,
    currency: string,
    tax: number,
    shipping: string,
    items: Array<Impression>,
  ): void {
    this.log(transactionId, affiliation, value, currency, tax, shipping, items);
  }

  refund(transactionId: string, items: Array<Impression>): void {
    this.log(transactionId, items);
  }

  removeFromCart(item: Impression): void {
    this.log(item);
  }

  viewItem(item: Impression): void {
    this.log(item);
  }

  viewPromotion(promotion: Promotion): void {
    this.log(promotion);
  }

  private log(...args: (string | number | {} | Impression | Promotion | Impression[])[]): void {
    console.info(this.name, args);
  }
}
