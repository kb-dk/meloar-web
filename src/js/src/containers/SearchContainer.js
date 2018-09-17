import { search } from "../services/SearchService";

export default {
  name: "SearchContainer",

  data: () => ({}),

  methods: {
    setSearchResult(searchResult) {
      this.searchResult = searchResult;
    }
  },

  render(h) {
    return <div>{this.searchResult}</div>;
  }
};
