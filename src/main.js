import { createApp } from 'vue/dist/vue.esm-bundler.js'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.component('DataTable', DataTable)
app.component('Column', Column);
app.component('InputText', InputText)
app.component('Button', Button)
app.mount('#app')
