import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import OfaUi, { ja } from 'ofa-ui'

createApp(App)
  .use(OfaUi, {
    locale: ja,
  })
  .mount('#app')
