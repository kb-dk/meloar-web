export default {
  name: "PdfPreview",
  data: () => ({ pdfSrc: "" }),

  props: {
    page: {
      type: Object
    }
  },

  methods: {
    drawPage() {
      if (this.renderTask) return;

      const { viewport } = this;
      const canvas = document.createElement("canvas");
      const canvasContext = canvas.getContext("2d");
      const renderContext = { canvasContext, viewport };
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      this.renderTask = this.page.render(renderContext);
      this.renderTask.then(() => {
        this.src = canvas.toDataURL();
        canvas.width = 0;
        canvas.height = 0;
        this.pdfSrc = this.src;
      });
    },

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
        class: "pdf-preview"
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
    }
  },
  beforeDestroy() {
    this.destroyPage(this.page);
  },

  mounted() {
    this.drawPage();
  },

  watch: {
    page(page, oldPage) {
      this.destroyPage(oldPage);
    }
  },

  render(h) {
    return <img src={this.pdfSrc} />;
  }
};
