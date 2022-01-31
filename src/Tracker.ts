import { AnalyticsDriver, Impression, Promotion as Promo } from './drivers/Interface';
import { Collection } from './actions/Collection';
import { Product } from './entities/Product';
import { Cart } from './entities/Cart';
import { Promotion } from './entities/Promotion';
import { Checkout } from './actions/Checkout';
import { Refund } from './actions/Refund';

export class Tracker {
  private readonly driver: AnalyticsDriver;

  constructor(driver: AnalyticsDriver) {
    this.driver = driver;
  }

  getDriver(): AnalyticsDriver {
    return this.driver;
  }

  collection(items: Array<Impression> = []) {
    return new Collection(items, this.driver);
  }

  product(item: Impression) {
    return new Product(item, this.driver);
  }

  cart() {
    return new Cart(this.driver);
  }

  promotion(item: Promo) {
    return new Promotion(item, this.driver);
  }

  checkout() {
    return new Checkout(this.driver);
  }

  refund() {
    return new Refund(this.driver);
  }
}
