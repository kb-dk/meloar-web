import SearchResult from "./SearchResult.js";
import router from "../router/index.js";
import searchState from "../store/searchStore.js";
import AppliedFilters from "./AppliedFilters.js";

export default {
  name: "SearchResults",

  functional: true,
  props: {
    searchResults: {
      type: Array,
      required: true
    },
    facets: {
      type: Object,
      required: true
    },
    hits: {
      type: String,
      required: true
    }
  },
  methods: {
    filterFromFacets(name, key, props) {
      console.log(props.props.searchResults["0"].query);
      var getQuery = searchState.query;
      if (getQuery === "") {
        getQuery = router.history.current.params.query;
      }
      router.push({
        name: "search",
        params: { query: getQuery + "&fq=" + key.key + ':"' + encodeURIComponent(name.name) + '"' }
      });
    }
  },

  render: (h, { props }) => {
    return (
      <div class="searchResults">
        <AppliedFilters queryString={searchState.query} route={router.history.current.path} />
        <div class="headline">Filter by:</div>
        <div class="facets">
          {Object.keys(props.facets).map(function(key) {
            var item = props.facets[key];
            if (Object.keys(props.facets).length > 1) {
              return (
                <div class="facet">
                  <div class="facetName">{key.split("_")[0]}</div>
                  {item.map(function(name, i) {
                    if (i % 2 == 0) {
                      return (
                        <div
                          onClick={e => this.a.methods.filterFromFacets({ name }, { key }, { props })}
                          class="facetItem"
                        >
                          {name || "Unknown"}
                        </div>
                      );
                    } else {
                      return <div class="facetHitNumber">({name})</div>;
                    }
                  }, this)}
                </div>
              );
            } else {
              return <div />;
            }
          }, this)}
        </div>
        <div class="headline">
          <span class="numbersFound">{props.hits}</span> matches was found in {props.searchResults.length} pdfs.
        </div>
        {props.searchResults.map(result => (
          <SearchResult result={result} />
        ))}
      </div>
    );
  }
};
