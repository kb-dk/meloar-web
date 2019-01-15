import searchState from "../../store/searchStore.js";

export default {
  name: "PdfDocument",

  data: () => ({}),

  created() {},

  props: {
    record: Object,
    singlePage: Boolean
  },

  methods: {
    getUrl() {
      return (
        "/api/meloar/pdf?url=" +
        this.record.doc.external_resource[0] +
        "#search=" +
        searchState.query +
        "&page=" +
        this.getSinglePageNumber()
      );
    },

    getSinglePageNumber() {
      return this.record.doc.page[0] === 0 ? 1 : this.record.doc.page[0];
    }
  },

  render(h) {
    return (
      <div class="iframe-container">
        <iframe src={this.getUrl()} />
      </div>
    );
  },

  beforeDestroy() {}
};
