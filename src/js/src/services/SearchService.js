import { storeSearchResult } from "../store/cacheStoreHelper.js";
import axios from "axios";
// Calls to search service
export function search(query) {
  const searchUrl = "/api/search?group.field=loar_id&group.limit=50&group=true&q=" + query;
  return axios.get(searchUrl).then(response => {
    storeSearchResult(response.data);
    return response.data;
  });
}
