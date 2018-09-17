import "babel-polyfill";
import Vue from "vue";
import App from "./App.js";
import router from "./router/index.js";

Vue.config.productionTip = false;
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
