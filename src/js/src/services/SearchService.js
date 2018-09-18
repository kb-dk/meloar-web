import axios from "axios";
// Calls to search service
export function search(query) {
  const searchUrl = "/api/search?q=" + query;
  return axios.get(searchUrl).then(response => {
    return response.data.response.docs;
  });
}
