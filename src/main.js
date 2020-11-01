import Vue from "vue";
import App from "./App.vue";
//import router from "./router";
import store from "./store";
import VueRouter from "vue-router";
import routes from "./router/index";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  store,
  router: new VueRouter(routes),
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
