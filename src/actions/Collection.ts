import { Product } from '../entities/Product';
import { AnalyticsDriver, Impression } from '../drivers/Interface';

export class Collection {
  private readonly list: Array<Product>;

  private readonly driver: AnalyticsDriver;

  private listName: string;

  constructor(
    itemsJson: Array<Impression> = [],
    driver: AnalyticsDriver = null,
    listName: string = null,
  ) {
    this.list = [];
    this.driver = driver;
    this.listName = listName;
    itemsJson.forEach((item: Impression) => this.addProduct(new Product(item, this.driver)));
  }

  getList(): Array<Impression> {
    return this.list;
  }

  getProduct(value: any, key: keyof Impression = 'id'): Product {
    return this.list.find((item: Product) => item.getJson()[key] === value);
  }

  addProduct(item: Product | Impression) {
    const prod = item instanceof Product
      ? item : new Product(item, this.driver);

    if (!this.listName && item.list) {
      this.listName = prod.list;
    } else {
      prod.list = this.listName;
    }

    this.list.push(prod);
  }

  impression() {
    this.driver?.impression(this.getList());
  }

  setListName(listName: string = null) {
    this.listName = listName;
  }

  getListName() {
    return this.listName;
  }
}
