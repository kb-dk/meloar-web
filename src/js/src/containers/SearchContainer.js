import searchState from "../store/searchStore.js";
import { search } from "../services/SearchService.js";
import SearchResults from "../components/SearchResults.js";
import SearchBox from "../components/SearchBox";

export default {
  name: "SearchContainer",

  data: () => ({ searchResult: [], query: searchState.query }),

  render(h) {
    return (
      <div class="searchContainer">
        <SearchBox placeholder={this.query} class="notFrontpage" />
        <SearchResults searchResults={this.searchResult} />
        <div>{this.query}</div>
      </div>
    );
  },
  methods: {
    setSearchResult(searchResult) {
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
<<<<<<< HEAD
    const searchResult = search("botanisk");
    search("botanisk").then(searchResult => {
      console.log(searchResult);
=======
    const searchResult = search("*.*");
    search("*.*").then(searchResult => {
>>>>>>> f52937aa33ee0e8081afdffe4f8082d34c46eb6c
      next(vm => {
        vm.setSearchResult(vm.structureSearchResult(searchResult));
      });
    });
  }
};
