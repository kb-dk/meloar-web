/**
 * Based on rosstas excellent toturial and code
 * on using pdf.js with vue
 * https://github.com/rossta/vue-pdfjs-demo
 */

import PdfPage from "./PdfPage.js";
import PdfPreview from "./PdfPreview.js";
import range from "lodash/range";
import throttle from "lodash/throttle";

//Move to config later
const BATCH_COUNT = 10;

//Move to seperate handler later
function getPages(pdf, first, last) {
  const allPages = range(first, last + 1).map(number => pdf.getPage(number));
  return Promise.all(allPages);
}

export default {
  name: "PdfDocument",
  //...
  data: () => ({
    pdf: undefined,
    pages: [],
    primaryPageNum: 0,
    scrollTop: 0,
    clientHeight: 0,
    cursor: 0,
    didReachBottom: false,
    singlePageloaded: false
  }),

  created() {
    this.fetchPDF();
  },

  props: {
    record: Object,
    singlePage: Boolean
  },

  methods: {
    fetchPDF() {
      import("pdfjs-dist/webpack")
        .then(pdfjs => pdfjs.getDocument(this.getUrl()))
        .then(pdf => (this.pdf = pdf));
    },

    getUrl() {
      return "/api/pdf?url=" + this.record.doc.external_resource[0];
    },

    getPage(pageNumber) {
      return this.pages[pageNumber];
    },
    updateScrollBounds() {
      const { scrollTop, clientHeight } = this.$el;
      this.scrollTop = scrollTop;
      this.clientHeight = clientHeight;
      this.didReachBottom = this.isBottomVisible();
    },

    /**Aargggh - clean up this mess..... */
    fetchPages() {
      if (!this.pdf) return;
      if (this.singlePageloaded) return;
      let startPage, endPage;
      const currentCount = this.pages.length;
      if (this.singlePage) {
        let singlePageIndexNumber = this.record.doc.page[0] - 1;
        startPage = singlePageIndexNumber;
        endPage = singlePageIndexNumber;
        this.singlePageloaded = true;
      } else {
        if (this.pageCount > 0 && currentCount === this.pageCount) {
          return;
        }
        if (this.cursor > currentCount) {
          return;
        }
        startPage = currentCount + 1; // PDF page numbering starts at 1
        endPage = Math.min(currentCount + BATCH_COUNT, this.pageCount);
      }
      this.cursor = endPage;
      getPages(this.pdf, startPage, endPage)
        .then(pages => {
          this.pages.splice(currentCount, 0, ...pages);
          return this.pages;
        })
        .catch(response => {
          this.$emit("document-errored");
        });
    },

    isBottomVisible() {
      const { scrollTop, clientHeight, scrollHeight } = this.$el;
      return scrollTop + clientHeight >= scrollHeight;
    },

    isTopVisible() {
      const { scrollTop } = this.$el;
      return scrollTop === 0 ? true : false;
    }
  },

  computed: {
    pageCount() {
      return this.pdf ? this.pdf.numPages : 0;
    }
  },

  render(h) {
    return (
      <div>
        <div class="pdfDocumentView">
          {this.pages.map((page, index) => (
            <div>
              <PdfPage
                class="pdf-page"
                page={page}
                scale={3}
                scrollTop={this.scrollTop}
                clientHeight={this.clientHeight}
              />
            </div>
          ))}
        </div>
      </div>
      /*<div class="pdfPreviewPane">
          {this.pages.map((page, index) => (
            <div>{index < 15 && <PdfPreview class="pdf-preview" page={page} scale={1} />}</div>
          ))}
        </div>
      </div>*/
    );
  },

  mounted() {
    this.updateScrollBounds();
    const throttledCallback = throttle(this.updateScrollBounds, 300);

    this.$el.addEventListener("scroll", throttledCallback, true);
    window.addEventListener("resize", throttledCallback, true);

    this.throttledOnResize = throttledCallback;
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.throttledOnResize, true);
  },

  watch: {
    pdf(pdf) {
      this.pages = [];
      this.fetchPages();
    },
    didReachBottom(didReachBottom) {
      if (didReachBottom) {
        this.fetchPages();
      }
    }
  }
};
