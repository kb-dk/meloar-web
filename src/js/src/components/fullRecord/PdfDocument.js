export default {
  name: "pdfDocument",

  props: {
    pdfUrl: {
      type: String,
      required: true
    },

    startPage: {
      type: Number,
      required: false
    }
  },

  data: () => ({ pages: [], pdf: {}, scale: 2 }),

  created() {
    this.fetchPDF();
  },

  methods: {
    setPdf(pdf) {
      this.pdf = pdf;
    },
    setPages(pages) {
      this.pages = pages;
    },

    fetchPDF() {
      //On the fly importing of pdfjs
      import("pdfjs-dist/webpack")
        .then(pdfjs => pdfjs.getDocument(this.pdfUrl))
        .then(pdf => this.setPdf(pdf));
    }
  },

  render(h) {
    <div class="pdfDoc">
      <PDFPage pages={this.pages} scale={this.scale} />
    </div>;
  },

  watch: {
    pdf(pdf) {
      this.pages = [];
      const promises = range(1, pdf.numPages).map(number => pdf.getPage(number));

      Promise.all(promises).then(pages => this.setPages(pages));
    }
  }
};
