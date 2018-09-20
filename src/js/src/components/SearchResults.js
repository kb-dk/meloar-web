import SearchResult from "./SearchResult.js";

export default {
  functional: true,
  props: {
    searchResults: {
      type: Array,
      required: true
    }
  },
  render: (h, { props }) => (
    <div class="searchResults">
      The following matches was found:
      {props.searchResults.map(result => (
        <SearchResult result={result} />
      ))}
    </div>
  )
};
