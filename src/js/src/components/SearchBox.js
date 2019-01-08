import searchState from "../store/searchStore.js";
import "../assets/styles/search.less";

export default {
  name: "SearchBox",
  data: () => ({ searchState }),
  methods: {
    search(e) {
      this.$router.push({ name: "search", params: { query: this.searchState.query } });
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
