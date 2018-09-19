import RecordMetadata from "../components/fullRecord/RecordMetadata.js";
import PdfDocument from "../components/fullRecord/PdfDocument.js";

export default {
  name: "FullRecordContainer",

  data: () => ({ recordData: {}, pdfUrl: "", startPage: 0 }),

  methods: {
    /*  setRecordData() {
      this.recordData = recordData;
    },
    setPdfUrl() {
      this.pdfUrl = pdfUrl;
    },
    setStartPage() {
      this.startPage = 0;
    }*/
  },

  render(h) {
    <div>
      <RecordMetadata recordData={this.recordData} />
      <div>
        <PdfDocument pdfUrl={this.pdfUrl} startPage={this.startPage} />
      </div>
    </div>;
  }
};