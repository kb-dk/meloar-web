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
        <div>{this.result.title}</div>

        {this.result.highLightSnippets.map(snippet => (
          <ul>
            <li>{snippet}</li>
          </ul>
        ))}

        <router-link to={this.getRecordLink(this.result.id)}>See more.</router-link>
      </div>
    );
  }
};
