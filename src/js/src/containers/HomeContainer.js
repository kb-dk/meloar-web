import SearchBox from "../components/SearchBox";
import SearchMap from "../components/SearchMap";

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
        <SearchMap />
        <div class="simpleNavigation">
          <router-link class="menuLink" to="/About">
            About this
          </router-link>
          <br />
          <br />
          <a href="https://www.labs.kb.dk">Back to labs.kb.dk</a>
        </div>
      </div>
    );
  }
};
