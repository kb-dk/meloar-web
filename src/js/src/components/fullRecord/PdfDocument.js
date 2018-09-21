import PDFPage from "./PdfPage.js";
import range from "lodash/range";

export default {
  name: "pdfDocument",

  props: {
    record: {
      type: Object,
      required: true
    }
  },

  data: () => ({ pdf: undefined, pages: [] }),

  created() {
    this.fetchPDF();
  },

  methods: {
    getPdfUrl: function() {
      console.log(this.record.doc ? this.record.doc.loar_resource[0] : "");
      //return this.record.doc ? this.record.doc.loar_resource[0] : "";
      return "/api/pdf";
    },

    getScale: function() {
      return 2;
    },

    setPages: function(pages) {
      this.pages = pages;
    },

    setPdf: function(pdf) {
      this.pdf = pdf;
    },

    fetchPDF() {
      //On the fly importing of pdfjs
      import("pdfjs-dist/webpack")
        .then(pdfjs => pdfjs.getDocument(this.getPdfUrl()))
        .then(pdf => this.setPdf(pdf));
    }
  },

  render(h) {
    return (
      <div class="pdfDoc">
        {this.pages.map(page => (
          <PDFPage page={page} scale={this.scale} />
        ))}
      </div>
    );
  },

  watch: {
    pdf(pdf) {
      this.pages = [];
      const promises = range(1, pdf.numPages).map(number => pdf.getPage(number));

      Promise.all(promises).then(pages => this.setPages(pages));
      console.log("all pdf pages set!!!");
    }
  }
};
