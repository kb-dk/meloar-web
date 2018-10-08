import RecordMetaData from "../components/fullRecord/RecordMetadata.js";
import PDFDocument from "../components/fullRecord/PdfDocument.js";

import { isResultStored } from "../store/cacheStoreHelper.js";
import cache from "../store/cacheStore.js";

export default {
  name: "FullRecordContainer",

  data: () => ({ recordData: {}, pdfUrl: "", startPage: 0, id: "", singlePage: false }),

  methods: {
    setRecordData(rd) {
      console.log("rddoc", rd.doc);
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
      console.log("decoded page", page);
      if (page) {
        this.singlePage = true;
      }
    }
  },

  render(h) {
    return (
      <div>
        <RecordMetaData record={this.recordData} />
        <PDFDocument class="pdf-document" record={this.recordData} singlePage={this.singlePage} />
      </div>
    );
  },
  beforeRouteEnter(to, from, next) {
    console.log("params params to", to);
    console.log("params params from", from);
    next(vm => {
      if (isResultStored(to.params.id)) {
        vm.setRecordData(cache.searchCache[to.params.id]);
      }
      if (to.query && to.query.page) {
        console.log("page rendering!!!!!!!!!");
        vm.setPageRenderMode(true);
      }
      vm.setId(to.params.id);
    });
  }
};
