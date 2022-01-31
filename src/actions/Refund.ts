import { AnalyticsDriver, Impression } from '../drivers/Interface';

export class Refund {
  private driver: AnalyticsDriver;

  constructor(driver: AnalyticsDriver) {
    this.driver = driver;
  }

  refund(transactionId: string, items: Array<Impression> = []) {
    this.driver.refund(transactionId, items);
  }
}
