import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/style.scss'
import store from './store/store'

const app = createApp(App)

app.use(router)
app.use(store) // Adiciona o Vuex à aplicação
app.mount('#app')
