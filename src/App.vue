<template>
  <div id="app">
    <header class="top-bar spread">
      <nav class="top-bar-nav">
        <router-link to="/" class="top-bar-link">
          <i class="icofont-spoon-and-fork"></i>
          <span>Home</span>
        </router-link>
        <router-link to="/products" class="top-bar-link">
          <span>Products</span>
        </router-link>
        <router-link to="/pastOrders" class="top-bar-link">
          <span>Past Orders</span>
        </router-link>
      </nav>
      <div @click="toggleSidebar" class="top-bar-cart-link">
        <i class="icofont-cart-alt icofont-1x"></i>
        <span>Cart ({{ totalQuantity }})</span>
      </div>
    </header>

    <router-view :inventory="inventory" :addToCart="addToCart"/>

    <Sidebar v-if="showSidebar"
      :toggle="toggleSidebar"
      :cart="cart"
      :inventory="inventory"
      :remove="remove" />

  </div>
</template>
<style>
  body{
    margin: 0;
  }
</style>

<script>
import Sidebar from '@/components/SideBarView.vue'
import food from './food.json'
export default {
  components: {
    Sidebar
  },
  data () {
    return {
      showSidebar: false,
      inventory: food,
      cart: {}
    }
  },
  computed: {
    totalQuantity () {
      return (this.cart && Object.values(this.cart).reduce((acc, quantity) => acc + quantity, 0)) || 0
    },
    calculateTotal () {
      const total = Object.entries(this.cart).reduce((acc, curr, index) => {
        return acc + (curr[1] * this.getPrice(curr[0]))
      }, 0)
      return total.toFixed(2)
    }
  },
  methods: {
    addToCart (name, quantity) {
      if (!this.cart[name]) this.cart[name] = 0
      this.cart[name] += quantity
    },
    toggleSidebar () {
      this.showSidebar = !this.showSidebar
    },
    remove (name) {
      delete this.cart[name]
    },
    getPrice (name) {
      const product = this.inventory.find((p) => p.name === name)
      if (product && product.price) {
        return (product.price.USD) || 0
      }
      return 0
    }
  }
}
</script>
