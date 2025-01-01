import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';
import router from './router';
import { createPinia } from 'pinia'

const app = createApp(App);
const pinia = createPinia()
app.use(pinia)
app.use(ArcoVue);
app.use(router)

app.mount('#app');