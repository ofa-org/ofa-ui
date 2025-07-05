import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import OfaUi from 'ofa-ui/index.ts'
console.log('ofa-ui', OfaUi)
createApp(App).use(OfaUi).mount('#app')
