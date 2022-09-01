import Dialog from 'primevue/dialog';

import { createApp } from 'vue/dist/vue.esm-bundler.js'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
