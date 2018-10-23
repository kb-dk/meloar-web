import RecordMetaData from "../components/fullRecord/RecordMetadata.js";
import PDFDocument from "../components/fullRecord/PdfDocument.js";

import { isResultStored } from "../store/cacheStoreHelper.js";
import cache from "../store/cacheStore.js";

export default {
  name: "FullRecordContainer",

  data: () => ({ recordData: {}, pdfUrl: "", startPage: 0, id: "", singlePage: false }),

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

  render(h) {
    return (
      <div>
        {console.log("render called full record", this.recordData)}
        <RecordMetaData record={this.recordData} />
        <PDFDocument class="pdf-document" record={this.recordData} singlePage={this.singlePage} />
      </div>
    );
  },
  beforeMount() {
    console.log(this.$route.params);
    console.log(this.$route.query);
    if (isResultStored(this.$route.params.id)) {
      console.log("cache", cache.searchCache[this.$route.params.id]);
      this.recordData = cache.searchCache[this.$route.params.id];
    }
    if (this.$route.query && this.$route.query.page) {
      console.log("page rendering");
      this.setPageRenderMode(true);
    }
    this.setId(this.$route.params.id);
  }
};
