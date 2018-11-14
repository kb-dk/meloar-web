import searchState from "../store/searchStore.js";
import searchService from "../services/SearchService.js";
import SearchResults from "../components/SearchResults.js";
import SearchBox from "../components/SearchBox";

export default {
  name: "SearchContainer",

  data: () => ({ searchResult: [], query: searchState.query, facets: {}, hits: "" }),

  render(h) {
    return (
      <div class="searchContainer">
        <SearchBox placeholder={this.query} class="notFrontpage" />
        <SearchResults searchResults={this.searchResult} facets={this.facets} hits={this.hits} />
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
    setHits(hits) {
      this.hits = hits;
    },
    getFacets(searchResults) {
      let facets = JSON.parse(JSON.stringify(searchResults.facet_counts.facet_fields));
      return facets;
    },
    getHits(searchResults) {
      let hits = searchResults.grouped.loar_id.matches.toString();
      return hits;
    }
  },

  beforeRouteEnter(to, from, next) {
    console.log(searchState.query);
    searchService.search(searchState.query).then(searchResult => {
      next(vm => {
        vm.setSearchResult(searchService.structureSearchResult(searchResult));
        vm.setFacets(vm.getFacets(searchResult));
        vm.setHits(vm.getHits(searchResult));
      });
    });
  },

  beforeRouteUpdate(to, from, next) {
    if (checkForSearchChange(to, from)) {
      searchService.search(to.params.query).then(searchResult => {
        searchState.query = to.params.query;
        this.setSearchResult(searchService.structureSearchResult(searchResult));
        this.setFacets(this.getFacets(searchResult));
        this.setHits(this.getHits(searchResult));
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
