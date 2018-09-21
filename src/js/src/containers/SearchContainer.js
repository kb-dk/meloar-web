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
      for (let i = 0; i < searchResults.grouped.loar_id.groups.length; i++) {
        for (let o = 0; o < searchResults.grouped.loar_id.groups[i].doclist.docs.length; o++) {
          const highLightsBlock =
            searchResults.highlighting[searchResults.grouped.loar_id.groups[i].doclist.docs[o].id].content;
          highLights = highLightsBlock ? highLightsBlock : [];
          searchResults.grouped.loar_id.groups[i].doclist.docs[o].highLightSnippets = highLights;
        }
        results.push(searchResults.grouped.loar_id.groups[i]);
      }
      console.log("RESULTS");
      console.log(results);
      return results;
    }
  },

  beforeRouteEnter(to, from, next) {
    const searchResult = search("botanisk");
    search("botanisk").then(searchResult => {
      next(vm => {
        vm.setSearchResult(vm.structureSearchResult(searchResult));
      });
    });
  }
};
