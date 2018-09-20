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
    }
  },

  beforeRouteEnter(to, from, next) {
    const searchResult = search("botanisk");
    search("botanisk").then(searchResult => {
      console.log(searchResult);
      next(vm => {
        vm.setSearchResult(searchResult);
      });
    });
  }
};
