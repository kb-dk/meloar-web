export default {
  name: "SearchResult",
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  methods: {

  },
  render(h) {
    return (
      <div>
        <div class="searchResultChapter">{this.result.chapter}</div>
        <div class="searchResultChapter">{this.result.content[0]}</div>
        <div class="searchResultChapter">{this.result.external_resource}</div>

        <router-link to="{this.result.id}">Moar</router-link>
      </div>
    );
  }
};
