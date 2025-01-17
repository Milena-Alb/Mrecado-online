<template>
    <aside class="cart-container">
      <div class="cart">
        <h1 class="cart-title spread">
          <span>
            Cart
            <i class="icofont-cart-alt icofont-1x"></i>
          </span>
          <button @click="toggle" class="cart-close"> &times; </button>
        </h1>

        <div class="cart-body">
          <table class="cart-table">
            <thead>
              <tr>
                <th><span class="sr-only">Product Image</span></th>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th><span class="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody v-if="cart && Object.keys(cart).length">
              <tr v-for="(quantity, key, i) in cart" :key="i">
                <td>
                  <i :class="`icofont-${getIcon(key)} icofont-3x`"></i>
                </td>
                <td>{{ key }}</td>
                <td>$ {{ getPrice(key) }}</td>
                <td class="center">{{ quantity }}</td>
                <td>$ {{ (getPrice(key) * quantity).toFixed(2) }}</td>
                <td class="center">
                  <button @click="remove(key)" class="btn btn-light cart-remove">
                    &times;
                  </button>
                </td>
              </tr>
            </tbody>
            <p class="center" v-else><em>No items in cart</em></p>
          </table>
          <div class="spread">
            <span><strong>Total:</strong> $ {{ calculateTotal() }}</span>
            <button class="btn btn-light" @click="checkout"> Checkout </button>
          </div>
        </div>
      </div>
    </aside>
  </template>

<script>
import { useStore } from 'vuex'

export default {
  props: ['toggle', 'cart', 'inventory', 'remove'],
  setup (props) {
    const store = useStore()

    const calculateTotal = () => {
      return Object.entries(props.cart)
        .reduce((acc, [key, quantity]) => acc + quantity * getPrice(key), 0)
        .toFixed(2)
    }

    const getPrice = (name) => {
      const product = props.inventory.find((p) => p.name === name)
      return product && product.price && product.price.USD ? product.price.USD : 0
    }

    const getIcon = (name) => {
      const product = props.inventory.find((p) => p.name === name)
      return product ? product.icon : 'question-circle'
    }

    const checkout = () => {
      const order = {
        items: { ...props.cart },
        total: calculateTotal(),
        date: new Date().toISOString()
      }
      store.dispatch('addOrder', order)
      alert('Order placed successfully!')
    }

    return { checkout, calculateTotal, getPrice, getIcon }
  }
}
</script>
