import {createApp} from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Axios from "axios";

const Vue = createApp(App);
Vue.use(router)
Vue.use(store)
Vue.config.globalProperties.$http = Axios;
Vue.mount('#app');
