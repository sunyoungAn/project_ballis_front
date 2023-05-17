import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import ElementPlues from 'element-plus'
import 'element-plus/dist/index.css'

const savedState = window.sessionStorage.getItem('vuex-state');

if (savedState) {
  store.replaceState(JSON.parse(savedState));
}

createApp(App).use(store).use(router).use(ElementPlues).mount('#app')
