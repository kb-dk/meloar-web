import searchState from "../store/searchStore.js";
import searchService from "../services/SearchService.js";
import SearchResults from "../components/SearchResults.js";
import SearchBox from "../components/SearchBox";

export default {
  name: "SearchContainer",

  data: () => ({ searchResult: [], query: searchState.query, facets: {} }),

  render(h) {
    return (
      <div class="searchContainer">
        <SearchBox placeholder={this.query} class="notFrontpage" />
        <SearchResults searchResults={this.searchResult} facets={this.facets} />
      </div>
    );
  },
  methods: {
    setSearchResult(searchResult) {
      this.searchResult = searchResult;
    },
    setFacets(facets) {
      this.facets = facets;
    },

    getFacets(searchResults) {
      let facets = JSON.parse(JSON.stringify(searchResults.facet_counts.facet_fields));
      return facets;
    }
  },

  beforeRouteEnter(to, from, next) {
    console.log(searchState.query);
    searchService.search(searchState.query).then(searchResult => {
      next(vm => {
        vm.setSearchResult(searchService.structureSearchResult(searchResult));
        vm.setFacets(vm.getFacets(searchResult));
      });
    });
  },

  beforeRouteUpdate(to, from, next) {
    if (checkForSearchChange(to, from)) {
      searchService.search(to.params.query).then(searchResult => {
        searchState.query = to.params.query;
        this.setSearchResult(searchService.structureSearchResult(searchResult));
        this.setFacets(this.getFacets(searchResult));
        next();
      });
    } else {
      next();
    }
  }
};

function checkForSearchChange(to, from) {
  return to.params.query !== from.params.query;
}
