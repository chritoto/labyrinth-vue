import './firebase';
import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import * as vueFire from 'vuefire';

Vue.config.productionTip = false;
Vue.use(vueFire);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
