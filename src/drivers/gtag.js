import chunk from '../helpers/chunk'

export const TYPE = 'gtag'

export default class Gtag {
    constructor(id) {
        if (id) {
            this.id = id
            this.init()
        }
    }

    init() {
        const element = document.createElement('script')

        element.src = 'https://www.googletagmanager.com/gtag/js?id=UA-98212043-2'
        element.async = true

        document.head.appendChild(element)

        window.dataLayer = window.dataLayer || []

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());

        gtag('config', this.id);
    }

    impression(items) {
        chunk(10, items).map(list => {
            gtag('event', 'view_item_list', { list })
        })
    }

    clickItem(item) {
        gtag('event', 'select_content', {
            'content_type': 'product',
            'items': [
                item
            ]
        })
    }

    viewItem(item) {
        gtag('event', 'view_item', {
            'items': [
                item
            ]
        })
    }

    addToCart(item) {
        gtag('event', 'add_to_cart', {
            'content_type': 'product',
            'items': [
                item
            ]
        })
    }

    removeFromCart(item) {
        gtag('event', 'remove_from_cart', {
            'content_type': 'product',
            'items': [
                item
            ]
        })
    }

    viewPromotion(promotion) {
        gtag('event', 'view_promotion', {
            'promotions': [promotion]
        })
    }

    clickPromotion(promotion) {
        gtag('event', 'select_content', {
            'promotions': [promotion]
        })
    }

    begin(items, coupon = null) {
        gtag('event', 'begin_checkout', {
            'items': items,
            'coupon': coupon
        })
    }

    progress(items, step = null, coupon = null) {
        gtag('event', 'checkout_progress', {
            'checkout_step': step,
            'items': items,
            'coupon': coupon
        })
    }

    option(option, step, description = 'description') {
        gtag('event', 'set_checkout_option', {
            'checkout_step': step,
            'checkout_option': description,
            'value': option
        })
    }

    purchase(transactionId, affiliation, value, currency, tax, shipping, items) {
        gtag('event', 'purchase', {
            'transaction_id': transactionId,
            affiliation,
            value,
            currency,
            tax,
            shipping,
            items
        })
    }

    refund(transactionId, items = []) {
        gtag('event', 'refund', { "transaction_id": transactionId, items })
    }

}
