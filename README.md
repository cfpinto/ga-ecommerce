# Google Analytics EC Wrapper

A javascript class designed to wrap google analytics enhanced e-commerce

It provides an unified api for both universal tracking and global site. It also keeps track of steps and lists automatically (uses localStorage)

## Installation

**Using npm**
```bash
npm install ga-tracker
```
**or yarn
```bash
yarn add ga-tracker
```
and then import it in your projects
```javascript
import GaTracker from 'ga-tracker'
``` 
Alternatively you can include a script tag point to the standalone version
```html
<scrpit src="node_modules/ga-tracker/dist/ga-tracker.min.js"></scrpit>
```

## Initialisation
Create a new instance of GaTracker and pass your analytics id as your first param
```html
<script>
	var ga = new GaTracker('UA-456465-I')
</script>
```
or if using node
```javascript
import GaTracker from 'ga-tracker'

const ga = new GaTracker('UA-456465-I')
```
By default it uses Universal Tracking if you want to use Global Site Tag set the second param to **gtag**

```html
<script>
	var ga = new GaTracker('UA-456465-I', 'gtag')
</script>
```
or if using node
```javascript
import GaTracker from 'ga-tracker'

const ga = new GaTracker('UA-456465-I', 'gtag')
```

If you already initialised Google analytics using either [Universal Analytics](https://developers.google.com/analytics/devguides/collection/analyticsjs/)
 or [Global Site Tag](https://developers.google.com/analytics/devguides/collection/gtagjs/) leave the first param blank.

```html
<script>
	var ga = new GaTracker(null, 'gtag')
</script>
```
or if using node
```javascript
import GaTracker from 'ga-tracker'

const ga = new GaTracker(null, 'gtag')
```

## Usage
I assume you know what each event does so I wont get into details about they are. 
I will instead show implementation examples. 
 
### List Impressions
```javascript
var l = ga.collection()
l.setListName('My First List')
```

Then add some products

```javascript
l.addJson({
	"id": "P12345",
	"name": "Android Warhol T-Shirt",
	"brand": "Google",
	"category": "Apparel/T-Shirts",
	"variant": "Black",
	"position": 1,
	"quantity": 2,
	"price": 2
})

var p = ga.product({
	"id": "P67890",
	"name": "Flame challenge TShirt",
	"brand": "MyBrand",
	"category": "Apparel/T-Shirts",
	"variant": "Red",
	"position": 2,
	"quantity": 1,
	"price": 3
})

l.addProduct(p)
l.impression()
```

### Product
```javascript
var p = ga.product({
	"id": "P67890",
	"name": "Flame challenge TShirt",
	"brand": "MyBrand",
	"category": "Apparel/T-Shirts",
	"variant": "Red",
	"position": 2,
	"quantity": 1,
	"price": 3
})

p.impression()
```
#### Click
```html
<button type="button" onclick="p.click()">Go To Product</button>
```
#### Add To Basket
```html
<script>
	var c = ga.cart()
	var p = ga.product({
		"id": "P67890",
		"name": "Flame challenge TShirt",
		"brand": "MyBrand",
		"category": "Apparel/T-Shirts",
		"variant": "Red",
		"position": 2,
		"quantity": 1,
		"price": 3
	})
</script>
<button type="button" onclick="c.add(p)">Add To Basket</button>
```
#### Remove From Basket
```html
<script>
	var c = ga.cart()
	var p = ga.product({
		"id": "P67890",
		"name": "Flame challenge TShirt",
		"brand": "MyBrand",
		"category": "Apparel/T-Shirts",
		"variant": "Red",
		"position": 2,
		"quantity": 1,
		"price": 3
	})
</script>
<button type="button" onclick="c.remove(p)">Remove From Basket</button>
```
### Promotions (AKA Coupon)
```javascript
var promo = ga.promotion({
	"id": "abc123",
	"name": "summer_promo"
})
promo.impression()
```
#### Click
```html
<script>
var promo = ga.promotion({
	"id": "abc123",
	"name": "summer_promo"
})
</script>
<div class="container">
	Lorem ipsum text
	<button type="button" class="cta" onclick="promo.click()">Claim Your Coupon</button>
</div>
```
### Checkout
#### Begin
```javascript
var tracker = new GaTracker()
var product1 = tracker.product({
	"id": "P12345",
	"name": "Android Warhol T-Shirt",
	"brand": "Google",
	"category": "Apparel/T-Shirts",
	"variant": "Black",
	"position": 1,
	"quantity": 1,
	"price": 2
})
var product2 = tracker.product({
	"id": "P67890",
	"name": "Flame challenge TShirt",
	"brand": "MyBrand",
	"category": "Apparel/T-Shirts",
	"variant": "Red",
	"position": 2,
	"quantity": 1,
	"price": 3
})
var checkout = tracker.checkout()
checkout
	.setItems([product1.getJson(), product2.getJson()])
	.begin()
```
#### Progress
```javascript
var tracker = new GaTracker()
var product1 = tracker.product({
	"id": "P12345",
	"name": "Android Warhol T-Shirt",
	"brand": "Google",
	"category": "Apparel/T-Shirts",
	"variant": "Black",
	"position": 1,
	"quantity": 1,
	"price": 2
})
var product2 = tracker.product({
	"id": "P67890",
	"name": "Flame challenge TShirt",
	"brand": "MyBrand",
	"category": "Apparel/T-Shirts",
	"variant": "Red",
	"position": 2,
	"quantity": 1,
	"price": 3
})
var checkout = tracker.checkout()
checkout
	.setItems([product1.getJson(), product2.getJson()])
	.progress()
```
You can progress as many times as you need. It will keep adding steps to the checkout. In case you need to implicitly
set the step pass it as a parameter on the progress method

```javascript
checkout.progress(2)
```
#### Options
```javascript
var tracker = new GaTracker()
var checkout = tracker.checkout()
checkout.option('Payment Method', 'AMEX')
```
#### Transaction
```javascript
var tracker = new GaTracker()
var product1 = tracker.product({
	"id": "P12345",
	"name": "Android Warhol T-Shirt",
	"list": "Search Results",
	"brand": "Google",
	"category": "Apparel/T-Shirts",
	"variant": "Black",
	"position": 1,
	"quantity": 1,
	"price": 2
})
var product2 = tracker.product({
	"id": "P67890",
	"name": "Flame challenge TShirt",
	"list": "Search Results",
	"brand": "MyBrand",
	"category": "Apparel/T-Shirts",
	"variant": "Red",
	"position": 2,
	"quantity": 1,
	"price": 3
})
var checkout = tracker.checkout()
checkout
	.setItems([product1.getJson(), product2.getJson()])
	.purchase('T20', null, value = 20, 'GBP', 20, 0)
```
#### Refunds
```javascript
var tracker = new GaTracker()
var refund = tracker.refund()
refund.refund('T20')
```

## Licence
GPL 3.0

## Credits
Thank you to [hussle.com](https://www.hussle.com) that allowed me to share this library originally developed for internal use.

## Keywords
Google Analytics Tracking