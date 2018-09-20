import searchState from "../store/searchStore.js";
import "../assets/styles/search.less";

export default {
  name: "SearchBox",
  data: () => ({ searchState }),
  methods: {
    search(e) {
      this.$router.push({ name: "search", params: { query: this.searchState.query } });
      e.preventDefault();
    }
  },
  render() {
    return (
      <div class="searchbox">
        <form onSubmit={e => this.search(e)}>
          <input
            type="text"
            placeholder="Type to search."
            value={this.searchState.query}
            onInput={e => (this.searchState.query = e.target.value)}
          />
          <button title="Search" type="submit" />
        </form>
      </div>
    );
  }
};
