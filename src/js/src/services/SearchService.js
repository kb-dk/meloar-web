import { storeSearchResult } from "../store/cacheStoreHelper.js";
import axios from "axios";
// Calls to search service
export function search(query) {
  const searchUrl = "/api/search?q=" + query;
  return axios.get(searchUrl).then(response => {
    console.log(response.data);
    //storeSearchResult(response.data.response.docs);
    return response.data;
  });
}
