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
import miser_endecode from "./methods/endecode.js"

 
Vue.prototype.$axios = axios;
Vue.prototype.addre = global_datavue.addre;
Vue.prototype.endecode = miser_endecode;
Vue.prototype.globaldata =  global_datavue;


// import VueRouter from 'vue-router'


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
