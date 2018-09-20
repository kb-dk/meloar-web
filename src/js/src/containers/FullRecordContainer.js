import RecordMetadata from "../components/fullRecord/RecordMetadata.js";
import PdfDocument from "../components/fullRecord/PdfDocument.js";
import router from "../router/index.js";

export default {
  name: "FullRecordContainer",

  data: () => ({ recordData: "", pdfUrl: "", startPage: 0, id: "" }),

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
    }
  },

  render(h) {
    return (
      <div>
        {this.id}
        Here!
        <RecordMetadata recordData={this.recordData} />
        <div />
      </div>
    );
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setId(to.params.id);
    });
  }
};
