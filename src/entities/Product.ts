import {
  AnalyticsDriver, ClickableInterface, HasJsonInterface, Impression, Printable,
} from '../drivers/Interface';

export class Product implements Impression, HasJsonInterface, Printable, ClickableInterface {
  private readonly json: Impression;

  private readonly driver: AnalyticsDriver;

  constructor(json?: Impression, driver?: AnalyticsDriver) {
    this.driver = driver;
    this.json = json;
  }

  getJson(): Impression {
    return this.json;
  }

  click() {
    this.driver.clickItem(this);
  }

  impression() {
    this.driver.viewItem(this);
  }

  get id(): string {
    return this.json.id;
  }

  set id(value: string) {
    this.json.id = value;
  }

  get name(): string {
    return this.json.name;
  }

  set name(value: string) {
    this.json.name = value;
  }

  get list(): string {
    return this.json.list;
  }

  set list(value: string) {
    this.json.list = value;
  }

  get brand(): string {
    return this.json.brand;
  }

  set brand(value: string) {
    this.json.brand = value;
  }

  get category(): string {
    return this.json.category;
  }

  set category(value: string) {
    this.json.category = value;
  }

  get variant(): string {
    return this.json.variant;
  }

  set variant(value: string) {
    this.json.variant = value;
  }

  get position(): number {
    return this.json.position;
  }

  set position(value: number) {
    this.json.position = value;
  }

  get price(): number {
    return this.json.price;
  }

  set price(value: number) {
    this.json.price = value;
  }

  get quantity(): number {
    return this.json.quantity || 1;
  }

  set quantity(value: number) {
    this.json.quantity = value;
  }

  get coupon(): string {
    return this.json.coupon;
  }

  set coupon(value: string) {
    this.json.coupon = value;
  }
}
