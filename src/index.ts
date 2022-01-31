import { Analytics } from './drivers/Analytics';
import { Gtag } from './drivers/Gtag';
import { Terminal } from './drivers/Terminal';
import { ANALYTICS } from './drivers/Interface';
import { Tracker } from './Tracker';

const gaTracker:any = (id:string = null, type: ANALYTICS = ANALYTICS.GTAG) => {
  switch (type) {
    case ANALYTICS.ANALYTICS:
      return new Tracker(new Analytics(id));
    case ANALYTICS.TERM:
      return new Tracker(new Terminal());
    case ANALYTICS.GTAG:
    default:
      return new Tracker(new Gtag(id));
  }
};

// @ts-ignore
window.gaTracker = gaTracker;

export default gaTracker;
