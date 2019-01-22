import searchState from "../store/searchStore.js";
import "../assets/styles/search.less";

export default {
  name: "SearchBox",
  data: () => ({ searchState }),
  methods: {
    search(e) {
      console.log(this.$router.history.current.params.query);
      let filters = this.$router.history.current.params.query;
      let fixedFilters = "";
      if (filters != undefined) {
        if (filters.indexOf("&d=") > -1 || filters.indexOf("&fq=") > -1) {
          if (filters.indexOf("&d=") > filters.indexOf("&fq=")) {
            fixedFilters = "&d=" + filters.split("&d=").pop();
          } else {
            fixedFilters = "&fq=" + filters.split("&fq=").pop();
          }
        }
        console.log(fixedFilters);
      }
      //console.log(filters);
      this.$router.push({ name: "search", params: { query: this.searchState.query + fixedFilters } });
      e.preventDefault();
    },
    returnToStart() {
      this.searchState.query = "";
      this.searchState.queryDisplay = "";
      this.$router.push({ name: "home" });
    }
  },
  render() {
    return (
      <div class="searchbox">
        <form onSubmit={e => this.search(e)}>
          <input
            size="16"
            type="text"
            placeholder="Type to search."
            value={this.searchState.queryDisplay}
            onInput={e => (this.searchState.query = e.target.value)}
          />
          <button class="submitButton" title="Search" type="submit" />
          <button class="resetButton" title="Reset" type="reset" on-click={this.returnToStart} />
        </form>
      </div>
    );
  }
};
