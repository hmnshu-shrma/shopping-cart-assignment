import cartTemplate from '../partials/cart.hbs'
import LocalStore from './storage'
import { renderHTML } from './utils'

/**
 * Creates a new Cart.
 * @class Cart
 * @classdesc handles the card rendering updating cart values for item prices.
 */

export default class Cart {
  /**
   * @constructs Cart
   */

  constructor() {
    this.storage = new LocalStore()
    this.handleCartView()
    this.cartTotal = 0
  }

  /**
   * @function handleCartView
   * check if data present in localStorage
   * updates cart view if data present
   */
  handleCartView = () => {
    const isDataPresent = this.storage.getLocaldata('cart')
    const { items, data, ifExists } = isDataPresent
    if (ifExists && items !== 0) {
      const cartTotal = this.getTotal(data)
      const templateResponse = {
        items: items,
        data: data,
        cartTotal: cartTotal
      }
      this.updateCartView(items, templateResponse)
    }
    return true
  }

  getTotal = args => {
    let initPrice = 0
    let itemPrice = 0
    let total = 0
    let totalPriceItem = 0
    for (var i = 0; i < args.length; i++) {
      if (args[i].totalPrice !== '') {
        totalPriceItem = args[i].totalPrice
        total = initPrice + totalPriceItem
        initPrice = total
      } else {
        itemPrice = parseInt(args[i].price)
        total = initPrice + itemPrice
        initPrice = total
      }
    }
    return total
  }

  /**
   * @function updateCartView
   * @param {number} numberOfItems - number of item selected by user
   * @param {object} data - number of item selected by user
   * updates item in cart button
   * updates cart view if data present
   */
  updateCartView = (numberOfItems, data) => {
    document.getElementById('cart-items').innerHTML = `${numberOfItems} Items`
    renderHTML('desktop-cart', cartTemplate, data)
  }

  /**
   * @function updateCartData
   * @param {string} productId - takes product id as param & and check for redundancy
   * @param {boolean} updateCartFlag - used to update the quantity of the item based
   * based on the flag increment or decrement is decided
   * updates item in cart button
   * updates cart view if data present
   */
  updateCartData = (productId, updateCartFlag) => {
    const localData = this.storage.getLocaldata('cart')
    const { data } = localData
    const itemTobeUpdated = data.filter(item => item.id === productId)
    const quantity = updateCartFlag
      ? itemTobeUpdated[0].quantity + 1
      : itemTobeUpdated[0].quantity - 1
    if (quantity === 0) {
      const isItemRemoved = confirm(
        'are you sure  you want to delete the items from your cart'
      )
      if (isItemRemoved) {
        if (this.storage.removeItemFromLIst(productId)) {
          this.generateCartView()
        }
      }
    } else {
      itemTobeUpdated[0].quantity = quantity
      itemTobeUpdated[0].totalPrice = quantity * itemTobeUpdated[0].price
      const isCartUpdated = this.storage.updateCartItemQtyAndPrice(
        'cart',
        itemTobeUpdated[0]
      )
      if (isCartUpdated) {
        this.generateCartView()
      } else {
        console.error('error in updating the cart')
      }
    }
  }

  /**
   * @function generateCartView
   * pull data from the localstorage  and populate cart template
   * present the data using render html function present in utils
   */
  generateCartView = () => {
    const storageData = JSON.parse(window.localStorage.cart)
    const cartTotal = this.getTotal(storageData)
    const newCartData = {
      items: storageData.length,
      data: storageData,
      cartTotal: cartTotal
    }
    renderHTML('desktop-cart', cartTemplate, newCartData)
    console.log('cart updated')
  }

  /**
   * @function updateItemQuantity
   * @event document#button
   * updtaes the quantity
   */
  updateItemQuantity = event => {
    const {
      target: { className, dataset }
    } = event
    if (className === 'btn-increment') {
      const { productId } = dataset
      this.updateCartData(productId, true)
    } else if (className === 'btn-decrement') {
      const { productId } = dataset
      this.updateCartData(productId, false)
    }
  }
}
