import router from "../router/index.js";

export default {
  name: "AppliedFilters",

  props: {
    queryString: {
      type: String,
      required: true
    }
  },

  data: () => ({ filters: [], orgQuery: "" }),

  methods: {
    findFilters(query) {
      if (query === "") {
        console.log(this);
        query = this.$route.params.query;
      }
      console.log(query);
      query = decodeURIComponent(query);
      this.filters = query.split("&fq=");
      this.orgQuery = this.filters[0];
      this.filters.shift();
      console.log("filters", this.filters);
    },
    removeSingleFilter(string) {
      for (let i = 0; i < this.filters.length; i++) {
        if (this.filters[i] === string) {
          this.filters.splice(i, 1);
        }
      }
      var mergedQuery = this.orgQuery;
      this.filters.length > 0 ? (mergedQuery = mergedQuery + "&fq=") : (mergedQuery = mergedQuery);
      mergedQuery = mergedQuery + this.filters.join("&fq=");
      //mergedQuery = encodeURIComponent(mergedQuery);
      router.push({
        name: "search",
        params: { query: mergedQuery }
      });
      console.log("clicked!", string);
    }
  },

  created() {
    this.findFilters(this.queryString);
  },

  watch: {
    queryString: function(newVal, oldVal) {
      this.findFilters(newVal);
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
    }
  },

  render(h) {
    return (
      <div class="appliedFilters">
        {this.filters.length > 0 ? <div class="headline">Applied Filters:</div> : <div />}
        {this.filters.length > 0 ? (
          <div class="appliedFilterSelection">
            {this.filters.map(filter => (
              <div onClick={e => this.removeSingleFilter(filter)}>{filter}</div>
            ))}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
};
