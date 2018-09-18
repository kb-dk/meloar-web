import SearchBox from "../components/SearchBox";

/**
 * Home
 */
export default {
  name: "HomeContainer",

  data: () => ({}),

  render(h) {
    return (
      <div class="homeContainer">
        <SearchBox />
        <div class="simpleNavigation">
        <router-link class="menuLink" to="/About">About this</router-link>
        </div>
      </div>
    );
  }
};
