import searchState from "../store/searchStore.js";
import searchService from "../services/SearchService.js";
import SearchResults from "../components/SearchResults.js";
import SearchBox from "../components/SearchBox";

export default {
  name: "SearchContainer",

  data: () => ({
    searchResult: [],
    query: searchState.query,
    facets: {},
    hits: "",
    searchError: false
  }),

  render(h) {
    return (
      <div class="searchContainer">
        {this.searchError && (
          <div class="searchError">
            Something went terribly wrong with your search. Please try agin.
          </div>
        )}
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
    },
    setErrorStatus() {
      this.searchError = true;
    }
  },

  beforeRouteEnter(to, from, next) {
    console.log(searchState.query);
    searchService
      .search(searchState.query)
      .then(searchResult => {
        next(vm => {
          vm.setSearchResult(searchService.structureSearchResult(searchResult));
          vm.setFacets(vm.getFacets(searchResult));
          vm.setHits(vm.getHits(searchResult));
        });
      })
      .catch(reason => {
        next(vm => {
          vm.setErrorStatus();
          console.log("reason!!!!", reason);
        });
      });
  },

  beforeRouteUpdate(to, from, next) {
    if (checkForSearchChange(to, from)) {
      searchService
        .search(to.params.query)
        .then(searchResult => {
          searchState.query = to.params.query;
          this.setSearchResult(searchService.structureSearchResult(searchResult));
          this.setFacets(this.getFacets(searchResult));
          this.setHits(this.getHits(searchResult));
          next();
        })
        .catch(reason => {
          this.searchError = true;
        });
    } else {
      next();
    }
  }
};

function checkForSearchChange(to, from) {
  return to.params.query !== from.params.query;
}
