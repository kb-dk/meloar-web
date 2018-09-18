import Vue from "vue";
import Router from "vue-router";

import HomeContainer from "../containers/HomeContainer.js";
import SearchContainer from "../containers/SearchContainer.js";
import AboutContainer from "../containers/AboutContainer.js";


Vue.use(Router);

const router = new Router({
  mode: "history",

  routes: [
    // Front page - home sweet home
    {
      path: "/",
      name: "home",
      component: HomeContainer
    },
    // Searching
    {
      path: "/search/:query",
      name: "search",
      component: SearchContainer
    },
    {
      path:"/about",
      name:"about",
      component:AboutContainer
    }
  ]
});

export default router;
