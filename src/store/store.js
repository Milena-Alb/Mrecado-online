import { createStore } from 'vuex'

const store = createStore({
  state: {
    pastOrders: [] // Lista para armazenar os pedidos anteriores
  },
  mutations: {
    ADD_ORDER (state, order) {
      state.pastOrders.push(order)
    }
  },
  actions: {
    addOrder ({ commit }, order) {
      commit('ADD_ORDER', order)
    }
  },
  getters: {
    getPastOrders (state) {
      return state.pastOrders
    }
  }
})

export default store
