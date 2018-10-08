/**
 * Based on rossta's excellent toturial and code
 * on using pdf.js with vue
 * https://github.com/rossta/vue-pdfjs-demo
 */

export default {
  name: "PdfPage",
  data: () => ({
    elementTop: 0,
    elementHeight: 0
  }),

  props: {
    page: {
      type: Object
    },
    scale: {
      type: Number
    },
    scrollTop: {
      type: Number,
      default: 0
    },
    clientHeight: {
      type: Number,
      default: 0
    }
  },

  methods: {
    drawPage() {
      if (this.renderTask) return;

      const { viewport } = this;
      const canvasContext = this.$el.getContext("2d");
      const renderContext = { canvasContext, viewport };

      // PDFPageProxy#render
      // https://mozilla.github.io/pdf.js/api/draft/PDFPageProxy.html
      this.renderTask = this.page.render(renderContext);
      this.renderTask.then(() => this.$emit("rendered", this.page));
    },

    //drawPage() {
    // ...
    //this.renderTask.then(/* */).catch(this.destroyRenderTask);
    // },

    destroyPage(page) {
      if (!page) return;
      // PDFPageProxy#_destroy
      // https://mozilla.github.io/pdf.js/api/draft/PDFPageProxy.html
      page._destroy();

      // RenderTask#cancel
      // https://mozilla.github.io/pdf.js/api/draft/RenderTask.html
      if (this.renderTask) this.renderTask.cancel();
    },

    destroyRenderTask() {
      if (!this.renderTask) return;

      // RenderTask#cancel
      // https://mozilla.github.io/pdf.js/api/draft/RenderTask.html
      this.renderTask.cancel();
      delete this.renderTask;
    },
    updateElementBounds() {
      const { offsetTop, offsetHeight } = this.$el;
      this.elementTop = offsetTop;
      this.elementHeight = offsetHeight;
    }
  },

  created() {
    // PDFPageProxy#getViewport
    // https://mozilla.github.io/pdf.js/api/draft/PDFPageProxy.html
    this.viewport = this.page.getViewport(2);
  },

  computed: {
    canvasAttrs() {
      let { width, height } = this.viewport;
      [width, height] = [width, height].map(dim => Math.ceil(dim));

      const style = this.canvasStyle;

      return {
        width,
        height,
        style,
        class: "pdf-page"
      };
    },

    canvasStyle() {
      const { width: actualSizeWidth, height: actualSizeHeight } = this.actualSizeViewport;
      const pixelRatio = window.devicePixelRatio || 1;
      const [pixelWidth, pixelHeight] = [actualSizeWidth, actualSizeHeight].map(dim =>
        Math.ceil(dim / pixelRatio)
      );
      return `width: ${pixelWidth}px; height: ${pixelHeight}px;`;
    },

    actualSizeViewport() {
      return this.viewport.clone({ scale: this.scale });
    },

    isElementVisible() {
      const { elementTop, elementBottom, scrollTop, scrollBottom } = this;
      if (!elementBottom) {
        return;
      }

      return elementTop < scrollBottom && elementBottom > scrollTop;
    },

    elementBottom() {
      return this.elementTop + this.elementHeight;
    },

    scrollBottom() {
      return this.scrollTop + this.clientHeight;
    }
  },
  beforeDestroy() {
    this.destroyPage(this.page);
  },

  mounted() {
    //this.drawPage();
    this.updateElementBounds();
  },

  watch: {
    page(page, oldPage) {
      this.destroyPage(oldPage);
    },

    isElementVisible(isElementVisible) {
      if (isElementVisible) {
        this.drawPage();
      }
    },

    scale: "updateElementBounds",
    scrollTop: "updateElementBounds",
    clientHeight: "updateElementBounds"
  },

  render(h) {
    const { canvasAttrs: attrs } = this;
    return h("canvas", { attrs });
  }
};
