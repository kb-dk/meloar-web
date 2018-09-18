import "babel-polyfill";
import Vue from "vue";
import App from "./App.js";
import router from "./router/index.js";

import './assets/styles/index.less';
import './assets/styles/mediaqueries.less';

Vue.config.productionTip = false;
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
