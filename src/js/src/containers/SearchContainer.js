import searchState from "../store/searchStore.js";
import { search } from "../services/SearchService.js";
import SearchResults from "../components/SearchResults.js";
import SearchBox from "../components/SearchBox";

export default {
  name: "SearchContainer",

  data: () => ({ searchResult: [], query: searchState.query }),

  render(h) {
    console.log("render is called");
    return (
      <div class="searchContainer">
        <SearchBox class="notFrontpage" />
        <SearchResults searchResults={this.searchResult} />
        <div>{this.query}</div>
      </div>
    );
  },

  methods: {
    setSearchResult(searchResult) {
      console.log(searchResult);
      this.searchResult = searchResult;
    },
    setQuery(query) {
      this.searchResult = searchResult;
    },

    structureSearchResult(searchResults) {
      let highLights = [];
      let results = [];
      for (let i = 0; i < searchResults.response.docs.length; i++) {
        const highLightsBlock =
          searchResults.highlighting[searchResults.response.docs[i].id].content;
        highLights = highLightsBlock ? highLightsBlock : [];
        searchResults.response.docs[i].highLightSnippets = highLights;
        results.push(searchResults.response.docs[i]);
      }
      return results;
    }
  },

  beforeRouteEnter(to, from, next) {
    const searchResult = search("*.*");
    search("*.*").then(searchResult => {
      console.log(searchResult);
      next(vm => {
        vm.setSearchResult(vm.structureSearchResult(searchResult));
      });
    });
  }
};
