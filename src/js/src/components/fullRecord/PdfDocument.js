import pdfjs from "pdfjs-dist";
import { PDFViewer } from "pdfjs-dist/lib/web/pdf_viewer";
import { PDFFindController } from "pdfjs-dist/lib/web/pdf_find_controller";
import { PDFSinglePageViewer } from "pdfjs-dist/lib/web/pdf_single_page_viewer";
import { PDFLinkService } from "pdfjs-dist/lib/web/pdf_link_service";
import searchState from "../../store/searchStore.js";
import "pdfjs-dist/web/pdf_viewer.css";

export default {
  name: "PdfDocument",

  data: () => ({ pdfViewer: null, pdfLoading: true, pdfError: false }),

  created() {},

  props: {
    record: Object,
    singlePage: Boolean
  },

  methods: {
    /**I need to DRY this out.... */
    fetchPDF() {
      // Some PDFs need CMAPS
      const CMAP_URLS = "../../../node_modules/pdfjs-dist/cmaps ";
      // local variable from prop to determine if single page
      const _SINGLE_PAGE = this.singlePage;
      // Retrieve the page the user wants to see
      const PAGE_TO_VIEW = this.getSinglePageNumber();
      // In vue2 we use refs for getting an element - use only when nescessary
      const PDF_CONTAINER = this.$refs.pdfViewer;
      //We need reference to this because of reduced scope
      const _self = this;
      //Reference to link service and pdf viewer
      let pdfLinkService, pdfViewer;
      //api/pdf?url=http://www.kulturarv.dk/fundogfortidsminder/resource/193241

      //Initialize and attach viewer to container
      if (this.singlePage) {
        pdfViewer = new PDFSinglePageViewer({
          container: PDF_CONTAINER
        });
      } else {
        /**Disabled link service for now */
        // pdfLinkService = new PDFLinkService();
        pdfViewer = new PDFViewer({
          container: PDF_CONTAINER,
          linkService: pdfLinkService
        });
        //pdfLinkService.setViewer(pdfViewer);
      }
      //Initialize find controller to viewer
      let pdfFindController = new PDFFindController({
        pdfViewer: pdfViewer
      });
      //Attach find controller to viewer
      pdfViewer.setFindController(pdfFindController);

      PDF_CONTAINER.addEventListener("pagesinit", function() {
        // We can use pdfSinglePageViewer now, e.g. let's change default scale.
        //pdfViewer.currentScaleValue = "page-width";

        // Change the page in view if single page
        if (_self.singlePage) {
          pdfViewer.currentPageNumber = PAGE_TO_VIEW;
        }
        //Initialize find controller to viewer
        _self.initFindController(pdfFindController);
      });
      //Load the actual pdf document - either single page or whole document
      this.loadPDFDocument(_SINGLE_PAGE, pdfViewer, CMAP_URLS, pdfLinkService, _self);
    },

    loadPDFDocument(_SINGLE_PAGE, pdfViewer, CMAP_URLS, pdfLinkService, _self) {
      pdfjs.GlobalWorkerOptions.workerSrc = "../../../node_modules/pdfjs-dist/lib/pdf.worker.js";
      pdfjs
        .getDocument({
          url: this.getUrl(),
          cMapUrl: CMAP_URLS,
          cMapPacked: true
          //Not shure this is the best way to go - disabling stream and auto fetch.
          //But seems to be less janky this way
          //disableAutoFetch: true,
          //disableStream: true,
          //disableRange: true
        })
        .then(function(pdfDocument) {
          if (_SINGLE_PAGE) {
            pdfViewer.setDocument(pdfDocument);
            _self.pdfLoading = false;
          } else {
            pdfViewer.setDocument(pdfDocument);
            _self.pdfLoading = false;
            /** Disabling link service for now */
            //pdfLinkService.setDocument(pdfDocument, null);
          }
        })
        .catch(function(err) {
          _self.pdfLoading = false;
          _self.pdfError = true;
        });

      // this.pdfViewer = pdfViewer;
    },

    getUrl() {
      return "/api/pdf?url=" + this.record.doc.external_resource[0];
    },

    initFindController(pdfFindController) {
      pdfFindController.executeCommand("find", {
        caseSensitive: false,
        findPrevious: undefined,
        highlightAll: true,
        phraseSearch: true,
        query: searchState.query
      });
    },

    getSinglePageNumber() {
      return this.record.doc.page[0] === 0 ? 1 : this.record.doc.page[0];
    }
  },

  render(h) {
    return (
      <div>
        <div>{this.pdfLoading && <div class="pdfLoader">LOADING PDF</div>}</div>
        <div>
          <div>
            {this.pdfError && (
              <div class="pdfLoadError">An error occurred - not able to load PDF</div>
            )}
          </div>
          <div id="pdfViewer" ref="pdfViewer">
            <div id="viewer" class="pdfViewer" />
          </div>
        </div>
      </div>
    );
  },

  mounted() {
    this.fetchPDF();
  },

  beforeDestroy() {
    // Not destroyed properly at the moment - check for memory leaks...
    if (this.pdfViewer !== null) {
      this.pdfViewer.destroy();
    }
  }
};
