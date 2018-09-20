import { storeSearchResult } from "../store/cacheStoreHelper.js";
import axios from "axios";
// Calls to search service
export function search(query) {
  const searchUrl = "/api/search?q=" + query;
  return axios.get(searchUrl).then(response => {
    storeSearchResult(response.data);
    return response.data;
  });
}
