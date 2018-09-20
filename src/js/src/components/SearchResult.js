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
    return <router-link to={this.getRecordLink(this.result.id)}>See more.</router-link>;
  }
};
