import chunk from '../helpers/chunk'

export const TYPE = 'analytics'

export default class UA {
    constructor(id) {
        if (id) {
            this.id = id
            this.init()
        } else {
            this.initEc()
        }
    }

    init() {
        ((i, s, o, g, r, a, m) => {
            i['GoogleAnalyticsObject'] = r
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date()
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0]
            a.async = 1
            a.src = g
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga')

        ga('create', this.id, { 'siteSpeedSampleRate': 10 })
        this.initEc()
        ga('send', 'pageview')
    }

    initEc() {
        ga('require', 'ec')
    }

    impression(items) {
        chunk(10, items).map(list => {
            list.map(item => {
                ga('ec:addImpression', item)
            })
            
            ga('ec:setAction', 'detail')
            this.event('view_item_list')
        })
    }

    clickItem(item) {
        ga('ec:addProduct', item)
        ga('ec:setAction', 'click', {
            'list': item.list
        })
        this.event('view_item')
        this.event('select_content', 'engagement', 'product', false)
    }

    viewItem(item) {
        ga('ec:addProduct', item)
        ga('ec:setAction', 'detail')
        this.event('view_item')
    }

    addToCart(item) {
        ga('ec:addProduct', item)
        ga('ec:setAction', 'add')
        this.event('add_to_cart', 'ecommerce')
    }

    removeFromCart(item) {
        ga('ec:addProduct', item)
        ga('ec:setAction', 'remove')
        this.event('remove_from_cart', 'ecommerce')
    }

    viewPromotion(promotion) {
        ga('ec:addPromo', promotion)
        ga('ec:setAction', 'detail')
        this.event('view_promotion')
    }

    clickPromotion(promotion) {
        ga('ec:addPromo', promotion)
        ga('ec:setAction', 'promo_click')
        this.event('select_content')
    }

    begin(items, coupon = null) {
        items.map(item => {
            ga('ec:addProduct', item)
        })
        ga('ec:setAction', 'checkout', {
            'step': 1,
            'coupon': coupon
        })
        this.event('begin_checkout', 'ecommerce')
    }

    progress(items, step = null, coupon = null) {
        items.map(item => {
            ga('ec:addProduct', item)
        })
        ga('ec:setAction', 'checkout', {
            'step': step,
            'coupon': coupon
        })
        this.event('checkout_progress', 'ecommerce')
    }

    option(option, step, description = null) {
        ga('ec:setAction', 'checkout_option', {step, option});
        this.event('set_checkout_option', 'ecommerce')
    }

    purchase(transactionId, affiliation, value, currency, tax, shipping, items) {
        items.map(item => {
            ga('ec:addProduct', item)
        })
        ga('set', 'currencyCode', currency)
        ga('ec:setAction', 'purchase', {
            'id': transactionId,
            affiliation,
            'revenue': value,
            tax,
            shipping
        })
        this.event('purchase', 'ecommerce')
    }

    refund(transactionId, items = []) {
        items.map(item => {
            ga('ec:addProduct', item)
        })
        ga('ec:setAction', 'refund', {'id': transactionId})
        this.event('refund', 'ecommerce')
    }

    event(eventAction, eventCategory = "engagement", eventLabel = null, nonInteractive = true, forceSSL = true) {
        let eventObject = {eventAction, eventCategory, nonInteractive, forceSSL}
        if (eventLabel) {
            eventObject = {eventLabel, ...eventObject}
        }
        
        ga('send', 'event', eventObject)
    }
}