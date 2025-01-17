<template>
  <div class="home">
    <div class="splash-container">
      <div class="splash">
        <h1>MarketPlace+ </h1>
      </div>
    </div>

    <main class="wrapper">

      <h2>Recommended</h2>

      <div class="recommended">
        <ProductsCartView v-for="(product, index) in inventory.slice(0, 3)" :key="product.id" class="card" :index="index" :product="product" :addToCart="addToCart" />

      </div>

    </main>
  </div>
</template>

<script>
import ProductsCartView from '@/components/ProductsCartView.vue'

export default {
  name: 'HomeView',
  props: ['inventory', 'addToCart'],
  components: {
    ProductsCartView
  }
}
</script>
