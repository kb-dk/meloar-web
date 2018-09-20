export default {
  name: "SearchResult",
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  methods: {
    getRecordLink(id) {
      return "/record/" + encodeURIComponent(id);
    }
  },
  render(h) {
    return (
      <div>
        <div class="searchResultChapter">{this.result.chapter && this.result.chapter}</div>
        {/*Rememeber this should loop when we go live*/}
        <div class="searchResultChapter">{this.result.content[0]}</div>
        <div class="searchResultChapter">
          {this.result.external_resource && this.result.external_resource}
        </div>
        <router-link to={this.getRecordLink(this.result.id)}>Moar</router-link>
      </div>
    );
  }
};
