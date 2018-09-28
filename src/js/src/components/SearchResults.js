import SearchResult from "./SearchResult.js";

export default {
  functional: true,
  props: {
    searchResults: {
      type: Array,
      required: true
    },
    facets: {
      type: Object,
      required: true
    }
  },
  render: (h, { props }) => {
    return (
      <div class="searchResults">
        <div class="facets">
          {Object.keys(props.facets).map(function(key) {
            var item = props[key];
            console.log(key);
            return (
              <div>
                <div> {key} </div>
              </div>
            );
          })}
        </div>
        The following matches was found:
        {props.searchResults.map(result => (
          <SearchResult result={result} />
        ))}
      </div>
    );
  }
};
