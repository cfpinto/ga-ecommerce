class Refund {
  constructor(driver) {
    this.driver = driver;
  }

  refund(transactionId, items = []) {
    this.driver.refund(transactionId, items);
    return this;
  }
}

export default Refund;
