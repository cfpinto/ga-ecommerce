class Cart {
    constructor(driver) {
        this.driver = driver
        this.items = []
    }

    add(product) {
        this.items.push(product)
        this.driver.addToCart(product.getJson())
    }

    remove(product) {
        this.items = this.getItems().filter(item => item.getJson().id !== product.getJson().id)
        this.driver.removeFromCart(product.getJson())
    }

    getItems() {
        return this.items
    }

    getItemsJson() {
        return this.items.map(item => item.getJson())
    }

    countItems() {
        let count = 0;
        this.getItems().map(item => {
            count += (item.getJson().quantity || 1)
        })

        return count
    }
}

export default Cart