import axios from "axios";
// Calls to search service
export function search(query) {
  const searchUrl = "";
  return new Promise(async (resolve, reject) => {
    try {
      const searchResult = axios.get(searchUrl);
      resolve(searchResult);
    } catch (error) {
      reject(error);
    }
  });
}
