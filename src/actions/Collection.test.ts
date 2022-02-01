import { Collection } from './Collection';
import { Terminal } from '../drivers/Terminal';
import { Impression } from '../drivers/Interface';
import { Product } from '../entities/Product';

jest.mock('../drivers/Terminal');

describe('Collection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should instantiate with no params', () => {
      const collection = new Collection();
      expect(collection.getList().length).toEqual(0);
    });

    it('should instantiate with items', () => {
      const collection = new Collection([{ id: '1' }]);
      expect(collection.getList().length).toEqual(1);
    });

    it('should instantiate with items & driver', () => {
      const collection = new Collection([{ id: '1' }], new Terminal());
      expect(collection.getList().length).toEqual(1);
      expect(Terminal).toHaveBeenCalledTimes(1);
    });

    it('should instantiate with items, driver & list name', () => {
      const listName = 'name';
      const impression: Impression = { id: '1' };
      const collection = new Collection([], new Terminal(), listName);
      expect(collection.getList().length).toEqual(0);
      expect(Terminal).toHaveBeenCalledTimes(1);

      collection.addProduct(impression);
      expect(impression.list).toEqual(listName);
    });
  });

  describe('methods', () => {
    let collection: Collection;
    const listName = 'tests';

    beforeEach(() => {
      collection = new Collection([], new Terminal(), listName);
    });

    it('should be able to add a new product from an impression', () => {
      const impression: Impression = { id: '1' };
      collection.addProduct(impression);
      expect(collection.getList().length).toEqual(1);
      expect(impression.list).toEqual(listName);
    });

    it('should be able to add a new product', () => {
      const product = new Product({ id: '1', list: 'my list' });
      collection.addProduct(product);
      expect(collection.getList().length).toEqual(1);
      expect(product.list).toEqual(listName);
    });

    it('should set the list name when adding a product if not set ', () => {
      collection = new Collection();
      const prod = new Product({ id: '1', list: 'name' });
      collection.addProduct(prod);
      expect(collection.getListName()).toEqual('name');
    });

    it('should be able to set the list name to string manually', () => {
      expect(collection.getListName()).toEqual('tests');
      collection.setListName('name');
      expect(collection.getListName()).toEqual('name');
    });

    it('should be able to set the list name to null manually', () => {
      expect(collection.getListName()).toEqual('tests');
      collection.setListName();
      expect(collection.getListName()).toBeNull();
    });

    it('should be able to get a list of products in the collection', () => {
      const product = new Product({ id: '1' });
      collection.addProduct(product);
      expect(collection.getList()).toEqual([product]);
    });

    it('should be able to get a specific product by id from the collections', () => {
      const prod1 = new Product({ id: '1' });
      const prod2 = new Product({ id: '2' });
      collection.addProduct(prod1);
      collection.addProduct(prod2);
      expect(collection.getList()).toEqual([prod1, prod2]);
      expect(collection.getProduct('1')).toEqual(prod1);
    });

    it('should be able to get a specific product by other key from the collections', () => {
      const prod1 = new Product({ id: '1', category: 'test1' });
      const prod2 = new Product({ id: '2', category: 'test2' });
      collection.addProduct(prod1);
      collection.addProduct(prod2);
      expect(collection.getList()).toEqual([prod1, prod2]);
      expect(collection.getProduct('test2', 'category')).toEqual(prod2);
    });

    it('should print a collection impressions', () => {
      const prod1 = new Product({ id: '1', category: 'test1' });
      const prod2 = new Product({ id: '2', category: 'test2' });
      collection.addProduct(prod1);
      collection.addProduct(prod2);
      collection.impression();
      expect(Terminal).toHaveBeenCalledTimes(1);
      expect((Terminal as jest.Mock).mock.instances[0].impression).toHaveBeenCalledTimes(1);
      expect((Terminal as jest.Mock).mock.instances[0].impression)
        .toHaveBeenCalledWith([prod1, prod2]);
    });

    it('should not print a collection impressions when driver is not set', () => {
      const collect = new Collection();
      const prod1 = new Product({ id: '1', category: 'test1' });
      const prod2 = new Product({ id: '2', category: 'test2' });
      collect.addProduct(prod1);
      collect.addProduct(prod2);
      collect.impression();
      expect(Terminal).toHaveBeenCalledTimes(1);
      expect((Terminal as jest.Mock).mock.instances[0].impression).not.toHaveBeenCalled();
    });
  });
});
