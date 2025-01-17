<template>
    <main class="wrapper">
      <h1>Past Orders</h1>
      <table class="product-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Items</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in pastOrders" :key="index">
            <td>{{ formatDate(order.date) }}</td>
            <td>
              <ul>
                <li v-for="(qty, product) in order.items" :key="product">
                  {{ qty }}x {{ product }}
                </li>
              </ul>
            </td>
            <td>${{ order.total }}</td>
          </tr>
        </tbody>
      </table>
    </main>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'PastOrdersView',
  setup () {
    const store = useStore()
    const pastOrders = computed(() => store.getters.getPastOrders)

    const formatDate = (dateString) => {
      const date = new Date(dateString)

      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    }

    return { pastOrders, formatDate }
  }
}
</script>
