import cache from "./cacheStore.js";
export function storeSearchResult(result) {
  let dataObjReadyForCache = {};
  for (let i = 0; i < result.response.docs.length; i++) {
    if (!isResultStored(result.response.docs[i].id)) {
      dataObjReadyForCache = {
        doc: result.response.docs[i],
        highLightSnippets: result.highlighting[result.response.docs[i].id]
      };
      cache.searchCache[result.response.docs[i].id] = dataObjReadyForCache;
    }
  }
  console.log("cacheDump", cache.searchCache);
}
function isResultStored(id) {
  return id in cache.searchCache ? true : false;
}
