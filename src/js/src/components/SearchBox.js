import searchState from "../store/searchStore.js";

export default {
  name: "SearchBox",
  data: () => ({ searchState }),
  methods: {
    search(e) {
      console.log("searching!");

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
            value={this.searchState.query}
            onInput={e => (this.searchState.query = e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
};
