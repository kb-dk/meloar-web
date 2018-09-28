import searchState from "../store/searchStore.js";
import { search } from "../services/SearchService.js";
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
    structureSearchResult(searchResults) {
      let highLights = [];
      let results = [];
      for (let i = 0; i < searchResults.grouped.loar_id.groups.length; i++) {
        searchResults.grouped.loar_id.groups[i].query = searchResults.responseHeader.params.q;
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
    },
    getFacets(searchResults) {
      let facets = JSON.parse(JSON.stringify(searchResults.facet_counts.facet_fields));
      return facets;
    }
  },

  beforeRouteEnter(to, from, next) {
    console.log(searchState.query);
    search(searchState.query).then(searchResult => {
      next(vm => {
        vm.setSearchResult(vm.structureSearchResult(searchResult));
        vm.setFacets(vm.getFacets(searchResult));
      });
    });
  },

  beforeRouteUpdate(to, from, next) {
    if (checkForSearchChange(to, from)) {
      search(to.params.query).then(searchResult => {
        searchState.query = to.params.query;
        this.setSearchResult(this.structureSearchResult(searchResult));
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
