import RecordMetaData from "../components/fullRecord/RecordMetadata.js";
import PDFDocument from "../components/fullRecord/PdfDocument.js";

import { isResultStored } from "../store/cacheStoreHelper.js";
import searchService from "../services/SearchService.js";
import searchState from "../store/searchStore.js";
import cache from "../store/cacheStore.js";

export default {
  name: "FullRecordContainer",

  data: () => ({ recordData: null, pdfUrl: "", startPage: 0, id: "", singlePage: false }),

  methods: {
    setRecordData(rd) {
      this.recordData = rd;
    },
    setPdfUrl(pdfUrl) {
      this.pdfUrl = pdfUrl;
    },
    setStartPage() {
      this.startPage = 0;
    },

    setId(id) {
      this.id = id;
    },

    setPageRenderMode(page) {
      if (page) {
        this.singlePage = true;
      }
    }
  },

  render: function(h) {
    return (
      <div>
        {this.recordData && (
          <div>
            <RecordMetaData record={this.recordData} />
          </div>
        )}
        {this.recordData && (
          <PDFDocument class="pdf-document" record={this.recordData} singlePage={this.singlePage} />
        )}
      </div>
    );
  },

  beforeRouteEnter(to, from, next) {
    if (isResultStored(to.params.id)) {
      next(vm => {
        vm.setRecordData(cache.searchCache[to.params.id]);
        if (to.query && to.query.page) {
          console.log("page rendering - retrieving from cache");
          vm.setPageRenderMode(true);
        }
        vm.setId(to.params.id);
      });
    } else {
      searchService.search("id:" + to.params.id).then(searchResult => {
        next(vm => {
          const structuredRes = searchService.structureSearchResult(searchResult);
          vm.setRecordData({ doc: structuredRes[0].doclist.docs[0] });
          if (to.query && to.query.page) {
            console.log("page rendering - new search - probably reload");
            vm.setPageRenderMode(true);
          }
          vm.setId(to.params.id);
        });
      });
    }
  }
};
