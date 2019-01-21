import router from "../router/index.js";

export default {
  name: "AppliedFilters",

  props: {
    queryString: {
      type: String,
      required: true
    },
    route: {
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
    },
    findCategory(filter) {
      var i = filter.indexOf(":");
      var stringSplit = [filter.slice(0, i), filter.slice(i + 1)];
      let category = stringSplit[0].substring(0, stringSplit[0].indexOf("_"));
      return category;
    },
    findName(filter) {
      var i = filter.indexOf(":");
      var stringSplit = [filter.slice(0, i), filter.slice(i + 1)];
      name = stringSplit[1];
      return name;
    }
  },

  created() {
    this.findFilters(this.queryString);
  },

  watch: {
    route: function(newVal, oldVal) {
      this.findFilters(this.queryString);
    }
  },

  render(h) {
    return (
      <div class="appliedFilters">
        {this.filters.length > 0 ? <div class="headline">Applied Filters:</div> : <div />}
        {this.filters.length > 0 ? (
          <div class="appliedFilterSelection">
            {this.filters.map(filter => (
              <div class="filterEntity" onClick={e => this.removeSingleFilter(filter)}>
                <div class="filterCategory">{this.findCategory(filter)}</div>
                <div class="filterColon">:</div>
                <div class="filterName">{this.findName(filter)}</div>
                <div class="filterClose">X</div>
              </div>
            ))}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
};
