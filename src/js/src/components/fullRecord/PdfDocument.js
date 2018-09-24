import PdfPage from "./PdfPage.js";
import PdfPreview from "./PdfPreview.js";
import range from "lodash/range";

export default {
  name: "PdfDocument",
  //...
  data: () => ({ pdf: undefined, pages: [], primaryPageNum: 0 }),

  created() {
    this.fetchPDF();
  },

  props: {
    record: {
      type: Object
    }
  },

  methods: {
    fetchPDF() {
      import("pdfjs-dist/webpack")
        .then(pdfjs => pdfjs.getDocument("/api/pdf"))
        .then(pdf => (this.pdf = pdf));
    },

    getPage(pageNumber) {
      return this.pages[pageNumber];
    }
  },

  render(h) {
    return (
      <div>
        <div class="pdfDocumentView">
          {this.pages.map((page, index) => (
            <div>
              {this.$props.record.doc.page[0] - 1 === index && (
                <PdfPage class="pdf-document" page={page} scale={3} />
              )}
            </div>
          ))}
          ;
        </div>
        <div class="pdfPreviewPane">
          {this.pages.map(page => (
            <PdfPreview class="pdfPreview" page={page} scale={1} />
          ))}
        </div>
      </div>
    );
  },

  watch: {
    pdf(pdf) {
      this.pages = [];
      const promises = range(1, pdf.numPages).map(number => pdf.getPage(number));
      Promise.all(promises).then(pages => (this.pages = pages));
    }
  }
};
