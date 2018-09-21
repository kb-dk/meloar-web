import range from "lodash/range";
import pdfjs from "pdfjs-dist";

export default {
  name: "pdfDocument",

  props: {
    record: {
      type: Object,
      required: true
    }
  },

  methods: {
    getPdfUrl: function() {
      console.log(this.record.doc ? this.record.doc.loar_resource[0] : "");
      //return "/api/pdf/" + (this.record.doc ? this.record.doc.external_resource[0] : "");
      return "/api/pdf";
    },

    getPage: function() {
      return this.record.doc ? this.record.doc.page : "";
    },

    showPdf: function() {},

    setPages: function(pages) {
      this.pages = pages;
    }
  },

  render(h) {
    return <div class="pdf">{renderPdf(this.getPage(), this.getPdfUrl())}</div>;
  }
};

function renderPdf(pageNumber, pdfUrl) {
  // If absolute URL from the remote server is provided, configure the CORS
  // header on that server.
  //var url = "//cdn.mozilla.net/pdfjs/helloworld.pdf";
  var url = "/api/pdf";

  // Asynchronous download of PDF
  var loadingTask = pdfjs.getDocument(url);
  loadingTask.promise.then(
    function(pdf) {
      console.log("PDF loaded");

      // Fetch the first page
      var pageNumber = 1;
      pdf.getPage(pageNumber).then(function(page) {
        console.log("Page loaded");

        var scale = 1.5;
        var viewport = page.getViewport(scale);

        // Prepare canvas using PDF page dimensions
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.then(function() {
          console.log("Page rendered");
          document.body.appendChild(canvas);
        });
      });
    },
    function(reason) {
      // PDF loading error
      console.error(reason);
    }
  );
}
