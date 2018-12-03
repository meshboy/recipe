import Vue from 'vue'
import App from './App.vue';
import router from './route';
import apolloProvider from './vue-apollo';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  apolloProvider
}).$mount('#app');
