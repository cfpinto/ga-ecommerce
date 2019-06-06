import UA from './drivers/analytics'
import Storage, { CHECKOUT_STEP_PREFIX } from './helpers/storage'

class Checkout {
    /**
     *
     * @param driver
     */
    constructor(driver) {
        this.storage = new Storage()
        this.driver = driver
        this.stepKey = `${CHECKOUT_STEP_PREFIX}[${window.location.pathname}]`
        this.lastStep = this.storage.getKey(CHECKOUT_STEP_PREFIX, 1)
        this.storedStep = this.storage.getKey(this.stepKey)
    }

    /**
     *
     * @returns {Checkout}
     */
    begin() {
        this.lastStep = 1
        this.storedStep = 1
        this.storage.setKey(this.stepKey, 1)
        this.storage.setKey(CHECKOUT_STEP_PREFIX, 1)
        this.driver.begin(this.getItems())
        return this
    }

    /**
     *
     * @param step
     * @returns {Checkout}
     */
    progress(step = null) {
        if (!this.storedStep) {
            this.lastStep++
            this.storedStep = this.lastStep
            this.storage.setKey(this.stepKey, this.storedStep)
            this.storage.setKey(CHECKOUT_STEP_PREFIX, this.lastStep)
        } else if (step) {
            this.lastStep++
            this.storedStep = step
            this.storage.setKey(this.stepKey, this.storedStep)
            this.storage.setKey(CHECKOUT_STEP_PREFIX, this.lastStep)
        }
        this.driver.progress(this.getItems(), this.storedStep)
        
        return this
    }

    /**
     * 
     * @param {string}value
     * @param {string}description
     */
    option(value, description) {
        this.driver.option(value, this.step, description)
    }

    /**
     *
     * @returns {Checkout}
     */
    purchase(transactionId, affiliation = null, value = null, currency = null, tax = null, shipping = null, items = null) {
        this.driver.purchase(transactionId, affiliation, value, currency, tax, shipping, items)
        return this
    }

    /**
     * 
     * @param {Array<{}>}items
     * @returns {Checkout}
     */
    setItems(items) {
        this.items = items
        return this
    }

    /**
     * 
     * @returns {Array<{}>}
     */
    getItems() {
        return this.items
    }
}

export default Checkout