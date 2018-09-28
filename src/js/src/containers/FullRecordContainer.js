import RecordMetaData from "../components/fullRecord/RecordMetadata.js";
import PDFDocument from "../components/fullRecord/PdfDocument.js";

import { isResultStored } from "../store/cacheStoreHelper.js";
import cache from "../store/cacheStore.js";

export default {
  name: "FullRecordContainer",

  data: () => ({ recordData: {}, pdfUrl: "", startPage: 0, id: "" }),

  methods: {
    setRecordData(rd) {
<<<<<<< HEAD
      console.log(rd.doc);
=======
      console.log("rddoc", rd.doc);
>>>>>>> 7848b7e0dd9591fd0b7c3a78a88badd1c1e547b5
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
    }
  },

  render(h) {
    return (
      <div>
        <RecordMetaData record={this.recordData} />
        <PDFDocument class="pdf-document" record={this.recordData} />
      </div>
    );
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (isResultStored(to.params.id)) {
        vm.setRecordData(cache.searchCache[to.params.id]);
      }
      vm.setId(to.params.id);
    });
  }
};
