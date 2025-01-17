<template>
    <main class="wrapper">
    <h1>Products</h1>

    <div class="card-container">
        <ProductsCartView v-for="(product, index) in inventory.slice(0, 16)" :key="product.id" class="card" :index="index" :product="product" :addToCart="addToCart" />
    </div>
    </main>
</template>

<script>
import ProductsCartView from '@/components/ProductsCartView.vue'

export default {
  props: ['inventory', 'addToCart'],
  components: {
    ProductsCartView
  }
}
</script>
