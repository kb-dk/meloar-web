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
          <div class="searchError">Something went terribly wrong with your search. Please try again.</div>
        )}
        <div class="labsContainer">
          <a href="http://labs.kb.dk/">Back to labs.kb.dk</a>
        </div>
        <SearchBox placeholder={this.query} class="notFrontpage" />
        <SearchResults
          searchResults={this.searchResult}
          facets={this.facets}
          matchCount={this.matchCount}
          documentCount={this.documentCount}
        />
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
    setMatchCount(count) {
      this.matchCount = count;
    },

    setDocumentCount(count) {
      this.documentCount = count;
    },

    getFacets(searchResults) {
      let facets = JSON.parse(JSON.stringify(searchResults.facet_counts.facet_fields));
      return facets;
    },
    getMatchCount(searchResults) {
      let matchCount = searchResults.grouped.loar_id.matches.toString();
      return matchCount;
    },
    getDocumentCount(searchResults) {
      let documentCount = searchResults.stats.stats_fields.loar_id.cardinality.toString();
      return documentCount;
    },
    setErrorStatus() {
      this.searchError = true;
    },
    getQuery(to) {
      let query = searchState.query;
      if (query === "") {
        console.log(to);
      }
    }
  },

  beforeRouteEnter(to, from, next) {
    const query = searchState.query === "" ? to.params.query : searchState.query;
    searchService
      .search(query)
      .then(searchResult => {
        next(vm => {
          vm.setSearchResult(searchService.structureSearchResult(searchResult));
          vm.setFacets(vm.getFacets(searchResult));
          vm.setMatchCount(vm.getMatchCount(searchResult));
          vm.setDocumentCount(vm.getDocumentCount(searchResult));
        });
      })
      .catch(reason => {
        next(vm => {
          vm.setErrorStatus();
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
          vm.setMatchCount(vm.getMatchCount(searchResult));
          vm.setDocumentCount(vm.getDocumentCount(searchResult));
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
