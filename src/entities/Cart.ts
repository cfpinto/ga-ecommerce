import { AnalyticsDriver } from '../drivers/Interface';
import { Product } from './Product';

export class Cart {
  private driver: AnalyticsDriver;

  private items: Array<Product>;

  constructor(driver: AnalyticsDriver) {
    this.driver = driver;
    this.items = [];
  }

  add(product: Product) {
    this.items.push(product);
    this.driver.addToCart(product);
  }

  remove(product: Product) {
    this.items = this.getItems().filter((item) => item.id !== product.id);
    this.driver.removeFromCart(product);
  }

  getItems(): Array<Product> {
    return this.items;
  }

  countItems(): number {
    return this.getItems()
      .reduce((prev: number, item: Product) => prev + item.quantity || 1, 0);
  }
}
