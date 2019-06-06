class Storage {

    constructor() {
        this.storageKey = 'ga-tracker-storage'
        this.init()
    }

    read() {
        return JSON.parse(localStorage.getItem(this.storageKey))
    }

    write(json) {
        localStorage.setItem(this.storageKey, JSON.stringify(json))
        
        return this
    }

    init() {
        this.json = (this.read() || {})
        this.write(this.json)
        return this
    }

    setKey(key, value) {
        this.json[key] = value
        
        return this.write(this.json)
    }

    getKey(key, defaultValue = null) {
        return this.json[key] || defaultValue
    }
}

export const LIST_NAME_KEY = 'list[name]'
export const ITEM_LIST_NAME_PREFIX = 'item[list][name]'
export const ITEM_LIST_POSITION_PREFIX = 'item[list][position]'
export const CHECKOUT_STEP_PREFIX = 'checkout[step]'

export default Storage