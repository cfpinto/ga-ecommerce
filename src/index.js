import UA, { TYPE as TYPE_ANALYTICS } from './drivers/analytics';
import Gtag from './drivers/gtag';
import Tracker from './tracker';

/**
 *
 * @param id
 * @param type
 * @returns {GaTracker}
 * @constructor
 */
const GaTracker = (id, type = TYPE_ANALYTICS) => {
  switch (type) {
    case TYPE_ANALYTICS:
      return new Tracker(new UA(id));
    default:
      return new Tracker(new Gtag(id));
  }
};

window.GaTracker = GaTracker;

export default GaTracker;
