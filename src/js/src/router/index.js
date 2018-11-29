import Vue from "vue";
import Router from "vue-router";

import HomeContainer from "../containers/HomeContainer.js";
import SearchContainer from "../containers/SearchContainer.js";
import AboutContainer from "../containers/AboutContainer.js";
import FullRecordContainer from "../containers/FullRecordContainer.js";

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

    //If no search performed we redirect to home
    {
      path: "/search",
      redirect: "/"
    },

    // Searching
    {
      path: "/search/:query",
      name: "search",
      component: SearchContainer
    },
    {
      path: "/about",
      name: "about",
      component: AboutContainer
    },
    {
      path: "/record/",
      name: "record",
      component: FullRecordContainer
    }
  ]
});

export default router;
