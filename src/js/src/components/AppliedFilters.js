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
        query = this.$route.params.query;
      }
      query = decodeURIComponent(query);
      // Create array with all the filters;
      let fqFilters = query.split("&fq=");
      // Check if we got a location filter (since it's first it will always be in the first element of the array, if it exists)
      let locFilters = fqFilters[0].split("&d=");
      // If it exists
      if (locFilters.length > 1) {
        // Set the original query to the first element of the array (which will be the query, before the first filter)
        this.orgQuery = locFilters[0];
        // Remove the query from the location filters array
        locFilters.shift();
        // Remove the first element of the filter query array, since it's what we got in the locFilter array.
        fqFilters.shift();
        // Set the filter to the combined loc and fq filter arrays.
        this.filters = locFilters.concat(fqFilters);
        // If we dont have a loation.
      } else {
        // Set the query to the first elemenet of the array, which is the original query.
        this.orgQuery = fqFilters[0];
        // Remove the query, so only filters is left in the array.
        fqFilters.shift();
        //  Set the filters to the fqFilter array.
        this.filters = fqFilters;
      }
    },
    removeSingleFilter(filterString) {
      for (let i = 0; i < this.filters.length; i++) {
        if (this.filters[i] === filterString) {
          this.filters.splice(i, 1);
        }
      }

      let mergedQuery = this.orgQuery;
      if (this.filters.length > 0) {
        if (this.filters[0].includes("&pt=") === true) {
          mergedQuery = mergedQuery + "&d=";
        } else {
          mergedQuery = mergedQuery + "&fq=";
        }
      }
      mergedQuery = mergedQuery + this.filters.join("&fq=");
      //mergedQuery = encodeURIComponent(mergedQuery);
      router.push({
        name: "search",
        params: { query: mergedQuery }
      });
    },
    findCategory(filter) {
      let category;
      if (filter.includes("&pt=") === true) {
        category = "location";
      } else {
        let i = filter.indexOf(":");
        let stringSplit = [filter.slice(0, i), filter.slice(i + 1)];
        category = stringSplit[0].substring(0, stringSplit[0].indexOf("_"));
      }
      return category;
    },
    findName(filter) {
      let name;
      if (filter.includes("&pt=") === true) {
        let location = filter.split("&pt=");
        name = "d=" + location[0] + "&pt=" + location[1];
      } else {
        let i = filter.indexOf(":");
        let stringSplit = [filter.slice(0, i), filter.slice(i + 1)];
        name = stringSplit[1];
      }
      return name;
    }
  },

  created() {
    this.findFilters(this.queryString);
  },

  watch: {
    route: function() {
      this.findFilters(this.queryString);
    }
  },

  render(h) {
    return (
      <div class="appliedFilters">
        {
          //Don't render them self closing divs unles you really mean it -
          //go with the short circuit conditional syntaks or use null instead
        }
        {this.filters.length > 0 ? <div class="headline">Applied Filters:</div> : <div />}

        {
          //Don't render them self closing divs unles you really mean it -
          //go with the short circuit conditional syntaks or use null instead
        }
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
