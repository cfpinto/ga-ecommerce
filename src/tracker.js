import Collection from './collection'
import Product from './product'
import Cart from './cart'
import Promotion from './promotion'
import Checkout from './checkout'
import Refund from './refund'
import UA from './drivers/analytics'

/**
 * 
 */
class GaTracker {
    /**
     * 
     * @param {UA}driver
     */
    constructor(driver) {
        this.driver = driver
    }

    /**
     * 
     * @param {Array<Object>}items
     * @returns {Collection}
     */
    collection(items) {
        return new Collection(items, this.driver)
    }

    /**
     * 
     * @param {Object}item
     * @returns {Product}
     */
    product(item) {
        return new Product(item, this.driver)
    }

    /**
     * 
     * @returns {Cart}
     */
    cart() {
        return new Cart(this.driver)
    }

    /**
     * 
     * @param {Object}item
     * @returns {Promotion}
     */
    promotion(item) {
        return new Promotion(item, this.driver)
    }

    /**
     * 
     * @returns {Checkout}
     */
    checkout() {
        return new Checkout(this.driver)
    }

    /**
     * 
     * @returns {Refund}
     */
    refund() {
        return new Refund(this.driver)
    }
}

export default GaTracker