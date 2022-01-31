import { Checkout } from './Checkout';
import { Terminal } from '../drivers/Terminal';
import { Storage } from '../helpers/Storage';
import { Product } from '../entities/Product';

const mockGetKey = jest.fn().mockImplementation((key: string, value: any) => value);
const mockSetKey = jest.fn();
jest.mock('../helpers/Storage', () => ({
  CHECKOUT_STEP_PREFIX: 'checkout[step]',
  Storage: jest.fn().mockImplementation(() => ({
    getKey: mockGetKey,
    setKey: mockSetKey,
  })),
}));
jest.mock('../drivers/Terminal');

describe('Checkout', () => {
  let checkout: Checkout;
  beforeEach(() => {
    jest.clearAllMocks();
    checkout = new Checkout(new Terminal());
  });

  it('should create a new instance when driver is provided', () => {
    expect(Storage).toHaveBeenCalledTimes(1);
    expect(Terminal).toHaveBeenCalledTimes(1);
    expect(mockGetKey).toHaveBeenCalledTimes(3);
    expect(mockGetKey).toHaveBeenNthCalledWith(1, 'checkout[step][current][localhost]', '1');
    expect(mockGetKey).toHaveBeenNthCalledWith(2, 'checkout[step][prev][localhost]', '1');
    expect(mockGetKey).toHaveBeenNthCalledWith(3, 'checkout[step][data][localhost]', []);
  });

  it('should set the steps to when when begin is called', () => {
    checkout.begin();
    expect(Storage).toHaveBeenCalledTimes(1);
    expect(mockSetKey).toHaveBeenCalledTimes(3);
    expect(mockSetKey).toHaveBeenNthCalledWith(1, 'checkout[step][current][localhost]', '1');
    expect(mockSetKey).toHaveBeenNthCalledWith(2, 'checkout[step][prev][localhost]', '1');
  });

  it('should update prev and current when progress is called without params', () => {
    checkout.begin();
    checkout.progress();
    expect(Storage).toHaveBeenCalledTimes(1);
    expect(mockSetKey).toHaveBeenCalledTimes(6);
    expect(mockSetKey).toHaveBeenNthCalledWith(1, 'checkout[step][current][localhost]', '1');
    expect(mockSetKey).toHaveBeenNthCalledWith(2, 'checkout[step][prev][localhost]', '1');
    expect(mockSetKey).toHaveBeenNthCalledWith(4, 'checkout[step][current][localhost]', '2');
    expect(mockSetKey).toHaveBeenNthCalledWith(5, 'checkout[step][prev][localhost]', '1');
  });

  it('should update prev and current when progress is called with params', () => {
    checkout.begin();
    checkout.progress('step1');
    checkout.progress('step2');
    expect(Storage).toHaveBeenCalledTimes(1);
    expect(mockSetKey).toHaveBeenCalledTimes(9);
    expect(mockSetKey).toHaveBeenNthCalledWith(1, 'checkout[step][current][localhost]', '1');
    expect(mockSetKey).toHaveBeenNthCalledWith(2, 'checkout[step][prev][localhost]', '1');
    expect(mockSetKey).toHaveBeenNthCalledWith(4, 'checkout[step][current][localhost]', 'step1');
    expect(mockSetKey).toHaveBeenNthCalledWith(5, 'checkout[step][prev][localhost]', '1');
    expect(mockSetKey).toHaveBeenNthCalledWith(7, 'checkout[step][current][localhost]', 'step2');
    expect(mockSetKey).toHaveBeenNthCalledWith(8, 'checkout[step][prev][localhost]', 'step1');
  });

  it('should call driver option to set options', () => {
    const value = 'an option';
    const description = 'a description';
    checkout.progress('step');
    checkout.option(value, description);
    expect((Terminal as jest.Mock).mock.instances[0].option).toHaveBeenCalledTimes(1);
    expect((Terminal as jest.Mock).mock.instances[0].option).toHaveBeenCalledWith(value, 'step', description);
  });

  it('should allow to set  and retrieve items', () => {
    const p = new Product({ id: '1' });
    checkout.setItems([p]);
    expect(checkout.getItems()).toEqual([p]);
    expect(mockSetKey).toHaveBeenNthCalledWith(3, 'checkout[step][data][localhost]', [p]);
  });

  it.each([
    ['1', null, null, null, null, null],
    ['1', 'fun', null, null, null, null],
    ['1', 'fun', 10, null, null, null],
    ['1', 'fun', 10, 'GBP', null, null],
    ['1', 'fun', 10, 'GBP', 23, null],
    ['1', 'fun', 10, 'GBP', 23, 'online'],
  ])(
    'should call driver purchase to track purchase with id = %s, affiliation = %s, value = %d, currency = %s, tax = %d, shipping = %s',
    (transactionId: string, affiliation: string, value: number, currency: string, tax: number, shipping: string) => {
      checkout.purchase({
        transactionId, affiliation, value, currency, tax, shipping,
      });
      expect((Terminal as jest.Mock).mock.instances[0].purchase).toHaveBeenCalledTimes(1);
      expect((Terminal as jest.Mock).mock.instances[0].purchase)
        .toHaveBeenCalledWith(transactionId, affiliation, value, currency, tax, shipping, []);
    },
  );
  // it.each([
  //   ['1'],
  //   // ['1', 'fun'],
  //   // ['1', 'fun', 10],
  //   // ['1', 'fun', 10, 'GBP'],
  //   // ['1', 'fun', 10, 'GBP', 23],
  //   // ['1', 'fun', 10, 'GBP', 23, 'online'],
  // ])('should call driver purchase to track purchase', (transactionId: string, affiliation: string = null, value: number = null, currency: string = null, tax: number = null, shipping: string = null) => {
  // });
});
