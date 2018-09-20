import cache from "./cacheStore.js";
export function storeSearchResult(result) {
  console.log(this);
  const dataObj = structureSearchResultForCache(result);
  if (!isResultStored(result.id)) {
    cache.searchCache[result.id] = dataObj[id];
  }
}

function isResultStored(id) {
  console.log("is in cache?", id in cache.searchCache);
  return result in cache.searchCache ? true : false;
}
function structureSearchResultForCache(result) {
  let dataObjReadyForCache = {};
  for (let id in result) {
    dataObjReadyForCache[id] = result;
  }
  return dataObjReadyForCache;
}
