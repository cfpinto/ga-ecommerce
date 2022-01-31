export enum ANALYTICS {
  ANALYTICS = 'analytics',
  GTAG = 'gtag',
  TERM = 'terminal',
}

export type GaEvent = {
  eventAction: string,
  eventCategory?: string,
  eventLabel?: string,
  nonInteractive?: boolean,
  forceSSL?: boolean,
};

export type Transaction = {
  transactionId: string,
  affiliation?: string,
  value?: number,
  currency?: string,
  tax?: number,
  shipping?: string,
};

export type Printable = {
  id: string,
  name?: string,
  position?: number,
};

export type Impression = Printable & {
  category?: string,
  variant?: string,
  brand?: string,
  quantity?: number,
  price?: number
  list?: string,
  coupon?: string,
};

export type Promotion = Printable & {
  creative?: string,
};

export interface HasJsonInterface {
  getJson(): Printable,
}

export interface PrintableInterface {
  impression(): void,
}

export interface ClickableInterface {
  click(): void,
}

export interface AnalyticsDriver {
  impression(items: Array<Impression>): void,
  clickItem(item: Impression): void,
  viewItem(item: Impression): void,
  addToCart(item: Impression): void,
  removeFromCart(item: Impression): void,
  viewPromotion(promotion: Promotion): void,
  clickPromotion(promotion: Promotion): void,
  begin(items: Array<Impression>, coupon?: Promotion): void,
  progress(items: Array<Impression>, step: string, coupon?: Promotion): void,
  option(option: string, step: string, description?: string): void,
  purchase(transactionId: string, affiliation: string, value: number,
    currency: string, tax: number, shipping: string, items: Array<Impression>): void,
  refund(transactionId:string, items: Array<Impression>): void,
}
