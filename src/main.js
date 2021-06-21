import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router/index.js'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import Home from "./views/Home.vue";
import axios from 'axios';
import './style/style.css';
import global_datavue from "./data/data.vue"
 
Vue.prototype.$axios = axios

// import VueRouter from 'vue-router'
Vue.prototype.addre = global_datavue.addre;

// Vue.use(VueRouter);
Vue.use(ViewUI);

// The routing configuration
// const RouterConfig = {
//     routes: Routers
// };
// const router = new VueRouter(RouterConfig);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
