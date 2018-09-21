import cache from "./cacheStore.js";
export function storeSearchResult(result) {
  console.log(result);
  let dataObjReadyForCache = {};
  for (let i = 0; i < result.grouped.loar_id.groups.length; i++) {
    for (let o = 0; o < result.grouped.loar_id.groups[i].doclist.docs.length; o++) {
      if (!isResultStored(result.grouped.loar_id.groups[i].doclist.docs[o].id)) {
        dataObjReadyForCache = {
          doc: result.grouped.loar_id.groups[i].doclist.docs[o],
          highLightSnippets: result.highlighting[result.grouped.loar_id.groups[i].doclist.docs[o].id]
        };
        cache.searchCache[result.grouped.loar_id.groups[i].doclist.docs[o].id] = dataObjReadyForCache;
      }
    }
  }
  //console.log("cacheDump", cache.searchCache);
}
export function isResultStored(id) {
  return id in cache.searchCache ? true : false;
}
