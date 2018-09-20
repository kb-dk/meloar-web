import cache from "../store/cacheStore.js";

export default {
  storeSearchResult: result => {
    const dataObj = this.structureSearchResultForCache(result);
    if (!this.isResultStored(result.id)) {
      cache.searchCache[result.id] = dataObj[id];
    }
  },

  isResultStored: id => {
    console.log("is in cache?", id in cache.searchCache);
    return result in cache.searchCache ? true : false;
  },

  structureSearchResultForCache: result => {
    let dataObjReadyForCache = {};
    for (let id in result) {
      dataObjReadyForCache[id] = result;
    }
    return dataObjReadyForCache;
  }
};
