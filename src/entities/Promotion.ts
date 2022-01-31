import {
  AnalyticsDriver,
  ClickableInterface,
  HasJsonInterface,
  PrintableInterface,
  Promotion as Promo,
} from '../drivers/Interface';

export class Promotion implements Promo, HasJsonInterface, PrintableInterface, ClickableInterface {
  private readonly driver: AnalyticsDriver;

  private readonly json: Promo;

  constructor(json?: Promo, driver?: AnalyticsDriver) {
    this.driver = driver;
    this.json = json;
  }

  impression() {
    this.driver.viewPromotion(this);
  }

  click() {
    this.driver.clickPromotion(this);
  }

  getJson() {
    return this.json;
  }

  get id(): string {
    return this.json.id;
  }

  set id(value) {
    this.json.id = value;
  }

  get name(): string {
    return this.json.name;
  }

  set name(value: string) {
    this.json.name = value;
  }

  get creative(): string {
    return this.json.creative;
  }

  set creative(value) {
    this.json.creative = value;
  }

  get position(): number {
    return this.json.position;
  }

  set position(value: number) {
    this.json.position = value;
  }
}
