import { Refund } from './Refund';
import { Terminal } from '../drivers/Terminal';

jest.mock('../drivers/Terminal');

describe('Refund', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an instance with driver', () => {
    new Refund(new Terminal());
    expect(Terminal).toHaveBeenCalledTimes(1);
  });

  it('should call the driver refund when the driver is set', () => {
    const refund = new Refund(new Terminal());
    refund.refund('1');
    expect(Terminal).toHaveBeenCalledTimes(1);
    expect((Terminal as jest.Mock).mock.instances[0].refund).toHaveBeenCalledTimes(1);
    expect((Terminal as jest.Mock).mock.instances[0].refund).toHaveBeenCalledWith('1', []);
  });
});
