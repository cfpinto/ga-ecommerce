import UA from './drivers/analytics'

/**
 * @property {string|int} id
 * @property {string} name
 * @property {string} creative
 * @property {string} position
 */
class Promotion {
    /**
     *
     * @param {{}}json
     * @param {UA}driver
     */
    constructor(json, driver) {
        this.json = {}
        this.driver = driver
        this.setJson(json)
    }

    /**
     * trigger impression
     */
    impression() {
        this.driver.viewPromotion(this.json)
    }

    /**
     * trigger promotion
     */
    click() {
        this.driver.clickPromotion(this.json)
    }

    /**
     * get json original parsed object
     *
     * @returns {{}}
     */
    getJson() {
        return this.json
    }

    /**
     * parse a json object into promo properties
     *
     * @param json
     */
    setJson(json) {
        Object.keys(json).map(key => (this[key] = json[key]))
    }

    /**
     *
     * @returns {string|int}
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
    get creative() {
        const key = this.driver instanceof UA ? 'creative' : 'creative_name'
        return this.json[key]
    }

    /**
     *
     * @param value
     */
    set creative(value) {
        const key = this.driver instanceof UA ? 'creative' : 'creative_name'
        this.json[key] = value
    }

    /**
     *
     * @returns {string}
     */
    get creative_name() {
        const key = this.driver instanceof UA ? 'creative' : 'creative_name'
        return this.json[key]
    }

    /**
     *
     * @param value
     */
    set creative_name(value) {
        const key = this.driver instanceof UA ? 'creative' : 'creative_name'
        this.json[key] = value
    }

    /**
     *
     * @returns {string}
     */
    get position() {
        const key = this.driver instanceof UA ? 'position' : 'creative_slot'
        return this.json[key]
    }

    /**
     *
     * @param value
     */
    set position(value) {
        const key = this.driver instanceof UA ? 'position' : 'creative_slot'
        this.json[key] = value
    }

    /**
     *
     * @returns {string}
     */
    get creative_slot() {
        const key = this.driver instanceof UA ? 'position' : 'creative_slot'
        return this.json[key]
    }

    /**
     *
     * @param value
     */
    set creative_slot(value) {
        const key = this.driver instanceof UA ? 'position' : 'creative_slot'
        this.json[key] = value
    }
}

export default Promotion