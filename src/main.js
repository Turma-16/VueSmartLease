import { createApp } from 'vue/dist/vue.esm-bundler.js'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Dropdown from 'primevue/dropdown';

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.component('Accordion', Accordion)
app.component('AccordionTab', AccordionTab)
app.component('Dropdown', Dropdown)
app.mount('#app')
