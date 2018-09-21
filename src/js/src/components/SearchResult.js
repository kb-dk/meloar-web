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
    },
    transformDate(date) {
      const convertedDate = new Date(date);
      const currentDate = new Date();
      const diffYears = currentDate.getFullYear() - convertedDate.getFullYear();
      return diffYears;
    },
    deliverTimeBetween(date) {
      const convertedDate = new Date(date);
      return convertedDate.getFullYear();
    }
  },
  render(h) {
    console.log("INDIVIDUAL SEARCH DATA");
    console.log(this.result);
    return (
      <div class="searchResult">
        <div>
          <div class="resultTitle">{this.result.doclist.docs["0"].title}</div>
          <div class="resultDate">
            From approx <span>{this.transformDate(this.result.doclist.docs["0"].ctime)}</span> years ago (
            {this.deliverTimeBetween(this.result.doclist.docs["0"].ctime)})
          </div>
        </div>
        <div>
          <div class="title" />
          <div class="">{this.result.chapter}</div>
        </div>
        {this.result.doclist.docs["0"].highLightSnippets.map(snippet => (
          <ul>
            <li>{snippet}</li>
          </ul>
        ))}
        <router-link to={this.getRecordLink(this.result.doclist.docs["0"].id)}>See more.</router-link>
      </div>
    );
  }
};
