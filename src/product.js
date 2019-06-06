import Storage, {LIST_NAME_KEY, ITEM_LIST_NAME_PREFIX, ITEM_LIST_POSITION_PREFIX} from './helpers/storage'
import UA from './drivers/analytics'

/**
 * @property {{}}Json
 * @property {UA}driver
 */
class Product {
    /**
     *
     * @param {Object}json
     * @param {UA}driver
     */
    constructor(json, driver) {
        this.storage = new Storage()
        this.storageKeyName = `${ITEM_LIST_NAME_PREFIX}[${json.id}]`
        this.storageKeyPosition = `${ITEM_LIST_POSITION_PREFIX}[${json.id}]`
        this.driver = driver
        this.json = {}
        this.setJson(json)
        this.list = this.storage.getKey(this.storageKeyName, this.storage.getKey(LIST_NAME_KEY, this.list))
        this.position = this.storage.getKey(this.storageKeyPosition, this.position)
    }

    /**
     *
     * @returns {{}}
     */
    getJson() {
        return this.json
    }

    /**
     *
     * @param {{}}json
     */
    setJson(json) {
        Object.keys(json).map(key => this[key] = json[key])
        return this
    }

    /**
     *
     * @returns {Product}
     */
    click() {
        this.driver.clickItem(this.json)
        return this
    }

    /**
     *
     * @returns {Product}
     */
    impression() {
        this.driver.viewItem(this.json)
        return this
    }

    /**
     * 
     * @param value
     */
    setPosition(value) {
        this.storage.setKey(this.storageKeyPosition, value)
        const key = this.driver instanceof UA ? 'position' : 'list_position'
        this.json[key] = value
    }

    /**
     * 
     * @returns {int}
     */
    getPosition() {
        const key = this.driver instanceof UA ? 'position' : 'list_position'
        return this.json[key]
    }

    /**
     * 
     * @param value
     */
    setList(value) {
        this.storage.setKey(this.storageKeyName, value)
        const key = this.driver instanceof UA ? 'list' : 'list_name'
        this.json[key] = value
    }


    /**
     *
     * @returns {string}
     */
    getList() {
        const key = this.driver instanceof UA ? 'list' : 'list_name'
        return this.json[key]
    }

    /**
     *
     * @returns {string}
     */
    get id() {
        return this.json.id
    }

    /**
     *
     * @param value
     */
    set id(value) {
        this.json.id = value
    }

    /**
     *
     * @returns {string}
     */
    get name() {
        return this.json.name
    }

    /**
     *
     * @param value
     */
    set name(value) {
        this.json.name = value
    }

    /**
     *
     * @returns {string}
     */
    get list() {
        return this.getList()
    }

    /**
     *
     * @param value
     */
    set list(value) {
        this.setList(value)
    }

    /**
     *
     * @returns {string}
     */
    get list_name() {
        return this.getList()
    }

    /**
     *
     * @param value
     */
    set list_name(value) {
        this.setList(value)
    }

    /**
     *
     * @returns {string}
     */
    get brand() {
        return this.json.brand
    }

    /**
     *
     * @param value
     */
    set brand(value) {
        this.json.brand = value
    }

    /**
     *
     * @returns {string}
     */
    get category() {
        return this.json.category
    }

    /**
     *
     * @param value
     */
    set category(value) {
        this.json.category = value
    }

    /**
     *
     * @returns {string}
     */
    get variant() {
        return this.json.variant
    }

    /**
     *
     * @param value
     */
    set variant(value) {
        this.json.variant = value
    }

    /**
     *
     * @returns {string}
     */
    get position() {
        return this.getPosition()
    }

    /**
     *
     * @param value
     */
    set position(value) {
        this.setPosition(value)
    }

    /**
     *
     * @returns {string}
     */
    get list_position() {
        return this.getPosition()
    }

    /**
     *
     * @param value
     */
    set list_position(value) {
        this.setPosition(value)
    }

    /**
     *
     * @returns {string}
     */
    get price() {
        return this.json.price
    }

    /**
     *
     * @param value
     */
    set price(value) {
        this.json.price = value
    }

    /**
     *
     * @returns {string}
     */
    get quantity() {
        return this.json.quantity
    }

    /**
     *
     * @param value
     */
    set quantity(value) {
        this.json.quantity = value
    }

    /**
     *
     * @returns {string}
     */
    get coupon() {
        return this.json.coupon
    }

    /**
     *
     * @param value
     */
    set coupon(value) {
        this.json.coupon = value
    }
}

export default Product