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
<<<<<<< HEAD
    record: {
      type: Object
    }
=======
    record: Object
>>>>>>> 7848b7e0dd9591fd0b7c3a78a88badd1c1e547b5
  },

  methods: {
    fetchPDF() {
      import("pdfjs-dist/webpack")
<<<<<<< HEAD
        .then(pdfjs => pdfjs.getDocument("/api/pdf"))
        .then(pdf => (this.pdf = pdf));
    },

=======
        .then(pdfjs => pdfjs.getDocument(this.getUrl()))
        .then(pdf => (this.pdf = pdf));
    },

    getUrl() {
      return "/api/pdf?url=" + this.record.doc.external_resource[0];
    },

>>>>>>> 7848b7e0dd9591fd0b7c3a78a88badd1c1e547b5
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
<<<<<<< HEAD
          {this.pages.map(page => (
            <PdfPreview class="pdfPreview" page={page} scale={1} />
=======
          {this.pages.map((page, index) => (
            <div>{index < 15 && <PdfPreview class="pdfPreview" page={page} scale={1} />}</div>
>>>>>>> 7848b7e0dd9591fd0b7c3a78a88badd1c1e547b5
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
