import searchState from "../../store/searchStore.js"
import router from "../../router/index.js"

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
      const proxyURL = encodeURIComponent("/api/resource/meloar/folkeskole?url=" + this.record.doc.external_resource[0])
      const viewerURL = "static/pdfviewer/web/viewer.html?file="
      const pageParams = this.singlePage ? "#search=" + searchState.query + "&page=" + this.getSinglePageNumber() : ""
      return viewerURL + proxyURL + pageParams
    },

    createSearchLink() {
      let q = router.history.current.query.query
      q = q.split("&query=").pop()
      return "/search/" + q
    },

    getSinglePageNumber() {
      return this.record.doc.page[0] === 0 ? 1 : this.record.doc.page[0]
    }
  },

  render(h) {
    return (
      <div>
        <router-link to={this.createSearchLink()} class="backToSearch">
          back to searching.
        </router-link>
        <div class="iframe-container">
          <iframe src={this.getUrl()} />
        </div>
      </div>
    )
  },

  beforeDestroy() {}
}
