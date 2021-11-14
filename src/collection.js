import Product from './product';
import Storage, { LIST_NAME_KEY } from './helpers/storage';

class Collection {
  /**
     * class constructor
     *
     * @param {Array<Object>}itemsJson
     * @param {UA}driver
     */
  constructor(itemsJson = [], driver = 'UA', listName = null) {
    this.list = [];
    this.driver = driver;
    this.storage = new Storage();
    this.setListName(listName || this.storage.getKey(LIST_NAME_KEY));
    itemsJson.map((item) => this.addJson(item));
  }

  /**
     * Get json collection
     *
     * @returns {Array<Object>}
     */
  getJson() {
    return this.list.map((item) => item.getJson());
  }

  /**
     *
     * @param value
     * @param key
     * @returns {Product}
     */
  getProduct(value, key = 'id') {
    return this.list.find((item) => item.getJson()[key] === value);
  }

  /**
     * @throws {string}
     *
     * @param {{}}item
     */
  addJson(item) {
    if (item instanceof Product) {
      throw Error('Invalid type, item must be simple object');
    }

    this.addProduct(new Product(item, this.driver));
  }

  /**
     *
     * @param {Product}item
     */
  addProduct(item) {
    // Check that global list is already set. if not set it
    if (!this.listName && item.list) {
      this.setListName(item.list);
    } else {
    // When global list is set override even if item has list
      // eslint-disable-next-line no-param-reassign
      item.list = this.listName;
    }

    this.list.push(item);
  }

  /** GA Methods */

  /**
     *
     */
  impression() {
    this.driver.impression(this.getJson());
  }

  setListName(listName) {
    this.listName = listName;
    this.storage.setKey(LIST_NAME_KEY, listName);
  }
}

export default Collection;
