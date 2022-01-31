import { AnalyticsDriver, Impression, Transaction } from '../drivers/Interface';
import { CHECKOUT_STEP_PREFIX, Storage } from '../helpers/Storage';

export class Checkout {
  private readonly driver: AnalyticsDriver;

  private readonly prevKey: string;

  private readonly currentKey: string;

  private readonly itemsKey: string;

  private prev: string;

  private current: string;

  private storage: Storage;

  private items: Array<Impression> = [];

  constructor(driver: AnalyticsDriver) {
    this.storage = new Storage();
    this.driver = driver;
    this.prevKey = `${CHECKOUT_STEP_PREFIX}[prev][${window.location.host}]`;
    this.currentKey = `${CHECKOUT_STEP_PREFIX}[current][${window.location.host}]`;
    this.itemsKey = `${CHECKOUT_STEP_PREFIX}[data][${window.location.host}]`;
    this.read();
  }

  begin() {
    this.prev = '1';
    this.current = '1';
    this.driver.begin(this.getItems());
    return this.store();
  }

  progress(step: string = null) {
    const temp = this.prev;
    this.prev = this.current;
    this.current = step || (parseInt(temp, 10) + 1).toString();
    this.driver.progress(this.getItems(), this.current);

    return this.store();
  }

  option(value: string, description: string) {
    this.driver.option(value, this.current, description);
  }

  purchase({
    transactionId,
    affiliation = null,
    value = null,
    currency = null,
    tax = null,
    shipping = null,
  }: Transaction) {
    this.driver.purchase(transactionId, affiliation, value, currency, tax, shipping, this.items);
    return this;
  }

  setItems(items: Array<Impression>) {
    this.items = items;

    return this.store();
  }

  getItems() {
    return this.items;
  }

  private store() {
    this.storage.setKey(this.currentKey, this.current);
    this.storage.setKey(this.prevKey, this.prev);
    this.storage.setKey(this.itemsKey, this.items);

    return this;
  }

  private read() {
    this.current = this.storage.getKey(this.currentKey, '1') as string;
    this.prev = this.storage.getKey(this.prevKey, '1') as string;
    this.items = this.storage.getKey(this.itemsKey, []) as Array<Impression>;
  }
}
