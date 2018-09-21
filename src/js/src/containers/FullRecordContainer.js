import RecordMetaData from "../components/fullRecord/RecordMetadata.js";

import { isResultStored } from "../store/cacheStoreHelper.js";
import cache from "../store/cacheStore.js";

export default {
  name: "FullRecordContainer",

  data: () => ({ recordData: {}, pdfUrl: "", startPage: 0, id: "" }),

  methods: {
    setRecordData(rd) {
      console.log("rd1", rd);
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
        <div />
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
