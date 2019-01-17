import { storeSearchResult } from "../store/cacheStoreHelper.js";
import axios from "axios";
// Calls to search service
export default {
  search: function(query) {
    const searchUrl = "/api/meloar/search?group.field=loar_id&group.limit=50&group=true&q=" + query;
    return axios
      .get(searchUrl)
      .then(response => {
        storeSearchResult(response.data);
        return response.data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },

  structureSearchResult: function(searchResults) {
    let highLights = [];
    let results = [];
    for (let i = 0; i < searchResults.grouped.loar_id.groups.length; i++) {
      searchResults.grouped.loar_id.groups[i].query = searchResults.responseHeader.params.q;
      for (let o = 0; o < searchResults.grouped.loar_id.groups[i].doclist.docs.length; o++) {
        const highLightsBlock =
          searchResults.highlighting[searchResults.grouped.loar_id.groups[i].doclist.docs[o].id]
            .content;
        highLights = highLightsBlock ? highLightsBlock : [];
        searchResults.grouped.loar_id.groups[i].doclist.docs[o].highLightSnippets = highLights;
      }
      results.push(searchResults.grouped.loar_id.groups[i]);
    }
    //console.log("RESULTS");
    //console.log(results);
    return results;
  }
};
