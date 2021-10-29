import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awasome.js';
import Axios from "axios";
require('dotenv').config();

const Vue = createApp(App);
Vue.use(router)
Vue.use(store)
Vue.component("font-awesome-icon", FontAwesomeIcon)
Vue.config.globalProperties.$http = Axios;
Vue.mount('#app');
