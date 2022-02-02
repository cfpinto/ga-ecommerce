import gaTracker from './index';
import { ANALYTICS } from './drivers/Interface';
import { Terminal } from './drivers/Terminal';
import { Gtag } from './drivers/Gtag';
import { init, initEc } from './drivers/ga';
import { Analytics } from './drivers/Analytics';
import { Tracker } from './Tracker';

jest.mock('./drivers/ga');
jest.mock('./drivers/gta');

describe('test is added to window object', () => {
  it('should have an instance of GaTracker in Window', () => {
    // @ts-ignore
    expect(window.gaTracker).toBe(gaTracker);
  });
});

describe('can be instantiated', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return instance with gtag driver when no driver is passed', () => {
    const t = gaTracker();
    expect(t).toBeInstanceOf(Tracker);
    expect(t.getDriver()).toBeInstanceOf(Gtag);
  });

  it('should return instance with gtag driver when driver is passed', () => {
    const t = gaTracker(null, ANALYTICS.GTAG);
    expect(t).toBeInstanceOf(Tracker);
    expect(t.getDriver()).toBeInstanceOf(Gtag);
  });

  it('should return instance with terminal driver when driver is passed', () => {
    const t = gaTracker(null, ANALYTICS.TERM);
    expect(t).toBeInstanceOf(Tracker);
    expect(t.getDriver()).toBeInstanceOf(Terminal);
  });

  it('should return instance with analytics driver when driver is passed', () => {
    const t = gaTracker(null, ANALYTICS.ANALYTICS);
    expect(t).toBeInstanceOf(Tracker);
    expect(t.getDriver()).toBeInstanceOf(Analytics);
  });

  it('should call ga init when an id is passed and using analytics driver', () => {
    gaTracker('ANID', ANALYTICS.ANALYTICS);
    expect(init).toHaveBeenCalledWith('ANID');
  });

  it('should call ga initEc but not init when an id is not passed and using analytics driver', () => {
    gaTracker(null, ANALYTICS.ANALYTICS);
    expect(init).not.toHaveBeenCalled();
    expect(initEc).toHaveBeenCalled();
  });
});
