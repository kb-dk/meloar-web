export default {
  props: {
    page: {
      type: String,
      required: true
    },
    scale: {
      type: Number,
      required: true
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
    drawPage() {
      // ...
      this.renderTask.then(/* */).catch(this.destroyRenderTask);
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
    }
  },

  mounted() {
    console.log("mounted pdf!");
    this.drawPage();
  },

  created() {
    console.log("created pdf!");
    // PDFPageProxy#getViewport
    // https://mozilla.github.io/pdf.js/api/draft/PDFPageProxy.html
    this.viewport = this.page.getViewport(this.scale);
  },

  beforeDestroy() {
    this.destroyPage(this.page);
  },

  render(h) {
    const { canvasAttrs: attrs } = this;
    return h("canvas", { attrs });
  },

  watch: {
    page(page, oldPage) {
      this.destroyPage(oldPage);
    }
  }
};
